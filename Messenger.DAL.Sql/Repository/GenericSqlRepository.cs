using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.DAL.Sql.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Messenger.DAL.Sql.Repository
{
    internal class GenericSqlRepository<TEntity> : IRepository<TEntity>
        where TEntity : BaseModel
    {
        private ApplicationContext context;
        private DbSet<TEntity> dbSet;

        public GenericSqlRepository(ApplicationContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        protected IIncludableQueryable<TEntity, object> Query { get; set; }

        protected DbSet<TEntity> DbSet { get => this.dbSet; set => this.dbSet = value; }

        protected ApplicationContext Context { get => this.context; set => this.context = value; }

        public TEntity GetById(string id)
        {
            if (this.Query != null)
            {
                return this.Query.FirstOrDefault(e => e.Id == id);
            }

            return this.dbSet.FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<TEntity> GetEntities()
        {
            if (this.Query != null)
            {
                return this.Query;
            }

            return this.dbSet;
        }

        public IEnumerable<TEntity> GetEntities(Expression<Func<TEntity, bool>> predicate)
        {
            if (this.Query != null)
            {
                return this.Query.Where(predicate);
            }

            return this.dbSet.Where(predicate);
        }

        public void Add(TEntity entity)
        {
            this.dbSet.Add(entity);
            this.context.SaveChanges();
        }

        public void Remove(TEntity entity)
        {
            this.dbSet.Remove(entity);
            this.context.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            this.dbSet.Update(entity);
            this.context.SaveChanges();
        }
    }
}