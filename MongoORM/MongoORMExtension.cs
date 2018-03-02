using MongoORM.Abstracts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MongoORM
{
    public static class MongoORMExtension
    {
        public static void  AddAsync<TEntity>(this IModelsProvider<TEntity> modelsProvider, TEntity entity) where TEntity : class
        {
            modelsProvider.Add(entity);
        }

        public static void UpdateAsync<TEntity>(this IModelsProvider<TEntity> modelsProvider, TEntity entity) where TEntity : class
        {
            Task.Run(async () =>
            {
                modelsProvider.Update(entity);
            });
        }

        public async static void RemoveAsync<TEntity>(this IModelsProvider<TEntity> modelsProvider, TEntity entity) where TEntity : class
        {
            modelsProvider.Remove(entity);
        }
    }
}
