using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System.Linq;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Models.Practice
{
    public class GetRequestListModel : PaginationModel<RequestDto>
    {
        public string AccountId { get; set; }
        public int? ExecutorId { get; set; }
        public int? FailureId { get; set; }

        public OrderDirection OrderByAccountId { get; set; }

        public IQueryable<REQUEST> GetQuery(PaySystemDataBase db,
            IQueryable<REQUEST> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.REQUEST.OrderByDescending(item => item.REQUESTCD).AsQueryable();
            if (!string.IsNullOrEmpty(AccountId))
                query = query.Where(item => item.ACCOUNTCD.Contains(AccountId));
            if (ExecutorId.HasValue)
                query = query.Where(item => item.EXECUTORCD == ExecutorId);
            if (FailureId.HasValue)
                query = query.Where(item => item.FAILURECD == FailureId);
            // Сортировка
            query = query
                .OrderBy(item => item.ACCOUNTCD, OrderByAccountId);
            return query;
        }
    }
}