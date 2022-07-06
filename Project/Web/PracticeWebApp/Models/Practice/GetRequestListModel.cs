﻿using AbonentPlus.PaySystem.Server.PaySystemORM;
using Newtonsoft.Json;
using PaySystemWebCommon.Dto.Pagination;
using PracticeWebApp.Dto.Practice;
using System;
using System.Linq;


namespace PracticeWebApp.Models.Practice
{
    public class GetRequestListModel : PaginationModel<RequestDto>
    {
        public string AccountCD { get; set; }
        public OrderDirection OrderByAccountCD { get; set; } //можно сделать по нескольким полям
        public IQueryable<REQUEST> GetQuery(PaySystemDataBase db,
            IQueryable<REQUEST> query = null)
        {
            // Фильтрация
            if (query == null)
                query = db.REQUEST.AsQueryable();
            if (!string.IsNullOrEmpty(AccountCD))
                query = query.Where(item => item.ACCOUNTCD.Contains(AccountCD));

            // Сортировка
            query = query
                .OrderBy(item => item.ACCOUNTCD, OrderByAccountCD);
            return query;
        }
    }
}