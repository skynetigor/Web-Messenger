using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
<<<<<<< Updated upstream
=======
using DocDb.Core.Abstracts;
>>>>>>> Stashed changes
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.DAL.MongoDB.Context;
using MongoODM.Abstracts;

namespace Messenger.DAL.MongoDB.Repositories
{
    internal class GenericMongoRepository<TEntity> : IRepository<TEntity>
        where TEntity : BaseModel, new()
    {
        private MongoAppContext context;
        private IModelsProvider<TEntity> modelsProvider;

        public GenericMongoRepository(MongoAppContext context)
        {
            this.context = context;
            this.modelsProvider = this.context.Set<TEntity>();
        }

        protected MongoAppContext Context
        {
            get { return this.context; }
        }

        protected IModelsProvider<TEntity> ModelsProvider
        {
            get { return this.modelsProvider; }
        }

        protected IQueryable<TEntity> Query { get; set; }

        public void Add(TEntity entity)
        {
            this.modelsProvider.Add(entity);
            context.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            this.modelsProvider.Update(entity);
            context.SaveChanges();
            
        }

        public void Remove(TEntity entity)
        {
            this.modelsProvider.Remove(entity);
            context.SaveChanges();

        }

        public TEntity GetById(string id)
        {
            return this.Query != null ? this.Query.FirstOrDefault(e => e.Id == id) : this.modelsProvider.FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<TEntity> GetEntities()
        {
            if (this.Query != null)
            {
                return this.Query.ToArray();
            }

            return this.modelsProvider;
        }

        public IEnumerable<TEntity> GetEntities(Expression<Func<TEntity, bool>> predicate)
        {
            if (this.Query != null)
            {
                return this.Query.Where(predicate);
            }

            return this.modelsProvider.Where(predicate.Compile());
        }
    }
}