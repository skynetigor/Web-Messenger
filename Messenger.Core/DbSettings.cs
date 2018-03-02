namespace Messenger.Core
{
    public class DbSettings
    {
        public DbSettings(DatabaseType dbType, string connectionString)
        {
            this.DbType = dbType;
            this.ConnectionString = connectionString;
        }

        public DatabaseType DbType { get; }

        public string ConnectionString { get; }
    }
}