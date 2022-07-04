using AbonentPlus.PaySystem.Server.PaySystemORM;
using Newtonsoft.Json;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Globalization;
using System.Linq;

namespace PracticeWebApp.Models.Practice
{
    public class GetRequestListModel : PaginationModel<RequestDto>
    {
        public string AbonentId { get; set; }
        public int? ExecutorId { get; set; }
        public int? FailureId { get; set; }
        public string IncomingDate { get; set; }
        public string ExecutionDate { get; set; }
        public string Executed { get; set; }
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
            if (!string.IsNullOrEmpty(IncomingDate))
                query = query.Where(item => item.INCOMINGDATE.Date == DateTime.Parse(IncomingDate, CultureInfo.GetCultureInfo("ru")));
            if (!string.IsNullOrEmpty(ExecutionDate))
                query = query.Where(item => item.EXECUTIONDATE.Value.Date == DateTime.Parse(ExecutionDate, CultureInfo.GetCultureInfo("ru")));
            if (!string.IsNullOrEmpty(Executed))
                query = query.Where(item => item.EXECUTED == Convert.ToInt16(Executed));
            // Сортировка
            query = query
                .OrderBy(item => item.INCOMINGDATE, OrderByIncomingDate)
                .OrderBy(item => item.EXECUTIONDATE, OrderByExecutionDate);
            return query;
        }
    }
}