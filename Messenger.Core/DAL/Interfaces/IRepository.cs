using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Messenger.Core.DAL.Interfaces
{
    public interface IRepository<TEntity>
        where TEntity : class
    {
        TEntity GetById(string id);

        IEnumerable<TEntity> GetEntities();

        IEnumerable<TEntity> GetEntities(Expression<Func<TEntity, bool>> predicate);

        void Add(TEntity entity);

        void Remove(TEntity entity);

        void Update(TEntity entity);
    }
}