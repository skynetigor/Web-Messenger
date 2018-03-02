using MongoDB.Bson.Serialization.Serializers;
using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization;
using MongoORM.Abstracts;
using MongoDB.Bson;
using System.Linq;

namespace MongoORM.Serializers
{
    internal class ModelSerializer<T> : IModelSerializer<BsonDocument>
    {
        private const string MongoIdProperty = "_id";
        private ITypeInitializer typeInitializer;

        public ModelSerializer(ITypeInitializer typeInitializer)
        {
            this.typeInitializer = typeInitializer;
        }

        public BsonDocument Serialize<TEntity>(TEntity entity) where TEntity : class
        {
            var typeModelThis = this.typeInitializer.InitializeType<TEntity>();

            var entType = typeModelThis.CurrentType;
            var id = entType.GetProperty(typeModelThis.idName).GetValue(entity).ToString();
            var document = new BsonDocument();
            document[MongoIdProperty] = id;

            foreach (var prop in entType.GetProperties().Where(p => p.Name != typeModelThis.idName))
            {
                if (prop.PropertyType.Name == typeof(ICollection<>).Name
                    || prop.PropertyType.Name == typeof(IEnumerable<>).Name)
                {
                    continue;
                }

                else if (prop.PropertyType.IsClass
                && prop.PropertyType != typeof(string))
                {
                    var currentValue = prop.GetValue(entity);
                    document.Remove(prop.Name);
                    document[prop.Name + "Id"] = "null";
                    if (currentValue != null)
                    {
                        var tmodel = this.typeInitializer.GetTypeModel(prop.PropertyType);
                        var currentProp = prop.PropertyType.GetProperty(tmodel.idName);
                        var val = currentProp.GetValue(currentValue);

                        if (val != null)
                        {
                            document[prop.Name + "Id"] = val.ToString();
                        }
                    }
                }
                else
                {
                    document[prop.Name] = prop.GetValue(entity).ToString();
                }
            }

            return document;
        }

        public IEnumerable<BsonDocument> Serialize<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            var documents = new List<BsonDocument>();

            foreach (var e in entities)
            {
                var doc = this.Serialize<TEntity>(e);
                documents.Add(doc);
            }

            return documents;
        }
    }
}
