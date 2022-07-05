using AbonentPlus.PaySystem.Server.PaySystemORM;
using Newtonsoft.Json;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Linq;

namespace PracticeWebApp.Models.Practice
{
    public class GetFailureListModel : PaginationModel<AbonentDto>
    {
        public IQueryable<DISREPAIR> GetQuery(PaySystemDataBase db,
            IQueryable<DISREPAIR> query = null)
        {
            return db.DISREPAIR;
        }
    }
}