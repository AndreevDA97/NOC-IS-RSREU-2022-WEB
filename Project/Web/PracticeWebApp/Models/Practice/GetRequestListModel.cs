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
        public string AbonentId { get; set; }
        public int? ExecutorId { get; set; }

        public int? FailureId { get; set; }
        public bool? Executed { get; set; }

        public DateTime? MinIncomingDate { get; set; }
        public DateTime? MaxIncomingDate { get; set; }
        public DateTime? MinExecutionDate { get; set; }
        public DateTime? MaxExecutionDate { get; set; }


        /*public OrderDirection OrderByAbonentFio { get; set; } = OrderDirection.Asc;
        public OrderDirection OrderByExecutorFio { get; set; } = OrderDirection.Asc;
        public OrderDirection OrderByFailureName { get; set; } = OrderDirection.Asc;*/
        public OrderDirection OrderByIncomingDate { get; set; } = OrderDirection.None;
        public OrderDirection OrderByExecutionDate { get; set; } = OrderDirection.None;

        public IQueryable<REQUEST> GetQuery(PaySystemDataBase db,
            IQueryable<REQUEST> query = null)
        {
            if (query == null)
                query = db.REQUEST
                    .AsQueryable();


            if (!string.IsNullOrEmpty(AbonentId))
                query = query.Where(item => item.ACCOUNTCD == AbonentId);
            if (ExecutorId != null)
                query = query.Where(r => r.EXECUTORCD == ExecutorId);
            if (FailureId != null)
                query = query.Where(item => item.FAILURECD == FailureId);
            if (Executed != null)
                query = query.Where(item => item.EXECUTED == (Executed.Value ? 1 : 0));
            if (MinIncomingDate != null)
                query = query.Where(i => i.INCOMINGDATE >= MinIncomingDate);
            if (MaxIncomingDate != null)
                query = query.Where(i => i.INCOMINGDATE <= MaxIncomingDate);
            if (MinExecutionDate != null)
                query = query.Where(i => i.EXECUTIONDATE >= MinIncomingDate);
            if (MaxExecutionDate != null)
                query = query.Where(i => i.EXECUTIONDATE <= MaxIncomingDate);

            if (OrderByIncomingDate != OrderDirection.None)
                query = query.OrderBy(r => r.INCOMINGDATE, this.OrderByIncomingDate);
            if (OrderByExecutionDate != OrderDirection.None)
                query = query.OrderBy(r => r.EXECUTIONDATE, this.OrderByExecutionDate);
            return query;
        }
    }
}