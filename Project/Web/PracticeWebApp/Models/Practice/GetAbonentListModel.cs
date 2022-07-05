using AbonentPlus.PaySystem.Server.PaySystemORM;
using Newtonsoft.Json;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Linq;

namespace PracticeWebApp.Models.Practice
{
    public class GetAbonentListModel : PaginationModel<AbonentDto>
    {
        public string Fio { get; set; }
        public int? StreetId { get; set; }
        public bool HasPhone { get; set; }
        public OrderDirection OrderByFio { get; set; }

        public IQueryable<ABONENT> GetQuery(PaySystemDataBase db,
            IQueryable<ABONENT> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.ABONENT.OrderByDescending(item => item.ACCOUNTCD).AsQueryable();
            if (!string.IsNullOrEmpty(Fio))
                query = query.Where(item => item.Fio.Contains(Fio));
            if (StreetId.HasValue)
                query = query.Where(item => item.STREETCD == StreetId);
            if (HasPhone)
                query = query.Where(item => item.PHONE.Trim() != "");
            // Сортировка
            query = query
                .OrderBy(item => item.Fio, OrderByFio);
            return query;
        }
    }
}