using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DbdocFramework.Abstracts;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.DAL.MongoDB.Context;

namespace Messenger.DAL.MongoDB.Repositories
{
    internal abstract class GenericMongoRepository<TEntity> : IRepository<TEntity>
        where TEntity : BaseModel, new()
    {
        private MongoAppContext context;
        private IDbSet<TEntity> modelsProvider;

        public GenericMongoRepository(MongoAppContext context)
        {
            this.context = context;
            this.modelsProvider = this.context.Set<TEntity>();
        }

        protected MongoAppContext Context
        {
            get { return this.context; }
        }

        protected IDbSet<TEntity> ModelsProvider
        {
            get { return this.modelsProvider; }
        }

        protected abstract IQueryable<TEntity> Query { get; }

        public void Add(TEntity entity)
        {
            this.modelsProvider.Add(entity);
        }

        public void Update(TEntity entity)
        {
            this.modelsProvider.Update(entity);
        }

        public void Remove(TEntity entity)
        {
            this.modelsProvider.Remove(entity);
        }

        public TEntity GetById(string id)
        {
            return this.Query.FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<TEntity> GetEntities()
        {
            return this.Query;
        }

        public IEnumerable<TEntity> GetEntities(Expression<Func<TEntity, bool>> predicate)
        {
            return this.Query.Where(predicate);
        }
    }
}