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
        public DateTime? IncomingDate { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public bool? Executed { get; set; }
        public OrderDirection OrderByIncomingDate { get; set; }
        public OrderDirection OrderByExecutionDate { get; set; }

        public IQueryable<REQUEST> GetQuery(PaySystemDataBase db,
            IQueryable<REQUEST> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.REQUEST.OrderByDescending(item => item.REQUESTCD).AsQueryable();
            //if (!string.IsNullOrEmpty(AbonentId))
            //    query = query.Where(item => item.ACCOUNTCD == AbonentId);
            //if (ExecutorId.HasValue)
            //    query = query.Where(item => item.EXECUTORCD == ExecutorId);
            //if (FailureId.HasValue)
            //    query = query.Where(item => item.EXECUTORCD == ExecutorId);
            if (IncomingDate != null)
                query = query.Where(item => item.INCOMINGDATE == IncomingDate);
            if (ExecutionDate != null)
                query = query.Where(item => item.EXECUTIONDATE == ExecutionDate);
            if (Executed.HasValue)
                query = query.Where(item => item.EXECUTED == ((Executed == true) ? 1 : 0)); // What?
            // Сортировка
            query = query
                .OrderBy(item => item.INCOMINGDATE, OrderByIncomingDate)
                .OrderBy(item => item.EXECUTIONDATE, OrderByExecutionDate);
            return query;
        }
    }
}