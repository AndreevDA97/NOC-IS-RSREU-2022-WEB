using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System.Linq;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Models.Practice
{
    public class GetFailureListModel : PaginationModel<FailureDto>
    {
        public string Name { get; set; }

        public OrderDirection OrderByName { get; set; }

        public IQueryable<DISREPAIR> GetQuery(PaySystemDataBase db,
            IQueryable<DISREPAIR> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.DISREPAIR.OrderByDescending(item => item.FAILURECD).AsQueryable();
            if (!string.IsNullOrEmpty(Name))
                query = query.Where(item => item.FAILURENM.Contains(Name));
            // Сортировка
            query = query
                .OrderBy(item => item.FAILURENM, OrderByName);
            return query;
        }
    }
}