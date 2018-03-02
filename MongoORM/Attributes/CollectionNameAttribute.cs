﻿using System;
using MongoORM.Models;

namespace MongoORM.Attributes
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = true)]

    public sealed class CollectionNameAttribute : AbstractORMAttribute
    {
        public string Name { get; set; }

        protected override void Map(TypeModel model)
        {
            model.CollectionName = Name;
        }
    }
}
