using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace PaySystemWebCommon.Dto.Pagination
{
    public enum OrderDirection
    {
        [Description("По убыванию")]
        Desc = -1,
        [Description("Без сортировки")]
        None = 0,
        [Description("По возрастанию")]
        Asc = 1,
    }
    public class PaginationModel<T>
    {
        public int PageSize { get; set; }
        public bool PageSizeAll => PageSize >= 9999;
        private int _pageNumber;
        public int PageNumber
        {
            get => Math.Min(_pageNumber, TotalPageCount);
            set => _pageNumber = value;
        }
        public bool Loaded { get; set; }
        public int TotalCount { get; set; }
        public int TotalPageCount => Math.Max(1, (TotalCount % PageSize == 0) ? TotalCount / PageSize : (TotalCount / PageSize + 1));

        public PaginationModel()
        {
            PageSize = 20;
            PageNumber = 1;
            TotalCount = 0;
        }
        public List<T> Data { get; set; }

    }
}
