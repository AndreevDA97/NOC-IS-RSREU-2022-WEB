using AbonentPlus.PaySystem.Server.PaySystemORM;
using Newtonsoft.Json;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Linq;

namespace PracticeWebApp.Models.Practice
{
    public class GetStreetListModel : PaginationModel<StreetDto>
    {
        public string Name { get; set; }
        public OrderDirection OrderByName { get; set; }

        public IQueryable<STREET> GetQuery(PaySystemDataBase db,
            IQueryable<STREET> query = null)
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