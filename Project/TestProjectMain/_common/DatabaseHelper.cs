using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace TestProjectMain._common
{
    internal class DatabaseHelper
    {
        public static PaySystemDataBase Db()
        {
            return new PaySystemDataBase(ConnectionString);
        }

        public static readonly string ConnectionString = new Properties.Settings().DB_CONNECTION_STR;
    }
}
