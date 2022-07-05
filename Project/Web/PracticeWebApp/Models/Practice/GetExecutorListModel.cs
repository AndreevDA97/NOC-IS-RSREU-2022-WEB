using AbonentPlus.PaySystem.Server.PaySystemORM;
using Newtonsoft.Json;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Linq;

namespace PracticeWebApp.Models.Practice
{
    public class GetExecutorListModel : PaginationModel<AbonentDto>
    {
        public IQueryable<EXECUTOR> GetQuery(PaySystemDataBase db,
            IQueryable<EXECUTOR> query = null)
        {
            return db.EXECUTOR;
        }
    }
}