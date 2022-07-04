using AbonentPlus.PaySystem.Server.PaySystemORM;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PracticeWebApp.Models.Practice
{
    public class GetRequestListModel : PaginationModel<RequestDto>
    {
        public int Id { get; set; }
        public string AccountId { get; set; }
        public int? ExecutorId { get; set; }
        public int? FailrueId { get; set; }
        public DateTime IncommingDate { get; set; }
        public DateTime? ExecutionDate { get; set; }
        public short? Executed { get; set; }

        public OrderDirection OrderByIncommingDate { get; set; }

        public IQueryable<REQUEST> GetQuery(PaySystemDataBase db,
           IQueryable<REQUEST> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.REQUEST.OrderByDescending(item => item.REQUESTCD).AsQueryable();
            if (ExecutionDate.HasValue)
                query = query.Where(item => item.EXECUTIONDATE.Value.Date == ExecutionDate.Value.Date.AddDays(1)); //Datepicker выдает на один день меньше?
            //if (FailrueId.HasValue)
            //    query = query.Where(item => item.FAILURECD == FailrueId);
            // Сортировка
            query = query
                .OrderBy(item => item.INCOMINGDATE, OrderByIncommingDate);
            return query;
        }
    }
}