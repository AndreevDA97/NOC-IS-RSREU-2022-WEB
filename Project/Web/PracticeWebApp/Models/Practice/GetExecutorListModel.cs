using AbonentPlus.PaySystem.Server.PaySystemORM;
using Newtonsoft.Json;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Linq;

namespace PracticeWebApp.Models.Practice
{
    public class GetExecutorListModel : PaginationModel<ExecutorDto>
    {
        public string Fio { get; set; }
        public OrderDirection OrderByFio { get; set; }

        public IQueryable<EXECUTOR> GetQuery(PaySystemDataBase db,
            IQueryable<EXECUTOR> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.EXECUTOR.OrderByDescending(item => item.EXECUTORCD).AsQueryable();
            if (!string.IsNullOrEmpty(Fio))
                query = query.Where(item => item.Fio.Contains(Fio));
            // Сортировка
            query = query
                .OrderBy(item => item.Fio, OrderByFio);
            return query;
        }
    }
}