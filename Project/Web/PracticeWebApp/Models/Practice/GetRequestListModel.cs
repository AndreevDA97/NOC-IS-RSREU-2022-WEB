using AbonentPlus.PaySystem.Server.PaySystemORM;
using Newtonsoft.Json;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Linq;

namespace PracticeWebApp.Models.Practice
{
    public class GetRequestListModel : PaginationModel<RequestDto>
    {
        public string AccountId { get; set; }
        public int? ExecutorId { get; set; }

        public int? FailureId { get; set; }
        public bool? Executed { get; set; }


        public OrderDirection OrderByIncomingDate { get; set; } = OrderDirection.Asc;
        public OrderDirection OrderByExecutionDate { get; set; } = OrderDirection.Asc;

        public IQueryable<REQUEST> GetQuery(PaySystemDataBase db,
            IQueryable<REQUEST> query = null)
        {
            if (query == null)
                query = db.REQUEST
                    .AsQueryable();


            if (!string.IsNullOrEmpty(AccountId))
                query = query.Where(item => item.ACCOUNTCD == AccountId);
            if (ExecutorId != null)
                query = query.Where(r => r.EXECUTED == ExecutorId);
            if (FailureId != null)
                query = query.Where(item => item.FAILURECD == FailureId);
            if (Executed != null)
                query = query.Where(item => item.EXECUTED == (Executed.Value ? 1 : 0));


            query = query
                .OrderBy(r => r.INCOMINGDATE, this.OrderByIncomingDate)
                .OrderBy(r => r.EXECUTIONDATE, this.OrderByExecutionDate);
            return query;
        }
    }
}