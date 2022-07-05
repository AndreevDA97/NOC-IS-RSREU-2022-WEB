using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System.Linq;
using AbonentPlus.PaySystem.Server.PaySystemORM;

namespace PracticeWebApp.Models.Practice
{
    public class GetExecutorListModel : PaginationModel<ExecutorDto>
    {
        public string Name { get; set; }

        public OrderDirection OrderByName { get; set; }

        public IQueryable<EXECUTOR> GetQuery(PaySystemDataBase db,
            IQueryable<EXECUTOR> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.EXECUTOR.OrderByDescending(item => item.EXECUTORCD).AsQueryable();
            if (!string.IsNullOrEmpty(Name))
                query = query.Where(item => item.Fio.Contains(Name));
            // Сортировка
            query = query
                .OrderBy(item => item.Fio, OrderByName);
            return query;
        }
    }
}