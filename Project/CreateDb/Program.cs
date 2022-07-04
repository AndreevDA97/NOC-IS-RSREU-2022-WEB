using AbonentPlus.PaySystem.Server.PaySystemORM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreateDb
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var db = new PaySystemDataBase("Data Source=localhost;Initial Catalog=paysys;User Id=sa;Password=1");
            db.CreateDatabase();
        }
    }
}
