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
        public string Name { get; set; }
        public OrderDirection OrderByName { get; set; }

        public IQueryable<REQUEST> GetQuery(PaySystemDataBase db,
            IQueryable<REQUEST> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.STREET.AsQueryable();
            if (!string.IsNullOrEmpty(Name))
                query = query.Where(item => item.STREETNM.Contains(Name));

            // Сортировка
            query = query
                .OrderBy(item => item.STREETCD, OrderByName);
            return query;
        }
    }
}