using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace MongoORM.Models
{
    public class TypeModel
    {
        public TypeModel()
        {
            this.QueryDictionary = new Dictionary<string, IEnumerable<BsonDocument>>();
        }
        public string CollectionName { get; set; }

        public string idName { get; set; }

        public Type CurrentType { get; set; }

        public BsonDocument[] Query { get; set; }

        public IDictionary<string, IEnumerable<BsonDocument>> QueryDictionary { get; set; }
    }
}
