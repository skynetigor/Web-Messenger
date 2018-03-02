﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MongoORM
{
    public class MongoContextSettings
    {
        public MongoContextSettings(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        public string ConnectionString { get; }
    }
}
