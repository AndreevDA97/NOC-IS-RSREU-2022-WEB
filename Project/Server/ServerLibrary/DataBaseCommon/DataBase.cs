using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Linq;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PaySystemServer.DataBaseCommon
{
    public static class DataBase
    {
        private static string _connectionString;

        public static void SetConnectionString(string newConnectionString)
        {
            _connectionString = newConnectionString;
        }

        public static string ConnectionString
        {
            get
            {
                if (String.IsNullOrWhiteSpace(_connectionString))
                {
                    _connectionString = ConfigurationManager.ConnectionStrings[Consts.PaysystemConnName].ConnectionString;
                }
                return _connectionString;
            }
        }

        public static PaySystemDataBase GetNew()
        {
            return new PaySystemDataBase(ConnectionString);
        }

        /// <summary>
        /// Максимальное каличество параметров в запросе (настоящее ограничение 2100)
        /// </summary>
        public const int MaxParameterCount = 2000;

        private const int MaxRecordCountToDelete = 100;
    }
}