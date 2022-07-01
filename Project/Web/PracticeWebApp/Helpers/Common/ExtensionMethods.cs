using PaySystemWebCommon.Dto.Pagination;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace System.Linq
{
    public static class ExtensionMethods
    {
        public static IQueryable<TSource> OrderBy<TSource, TKey>(this IQueryable<TSource> source,
            Expression<Func<TSource, TKey>> keySelector, OrderDirection order)
        {
            switch (order)
            {
                case OrderDirection.Asc:
                    return source.OrderBy(keySelector);
                case OrderDirection.Desc:
                    return source.OrderByDescending(keySelector);
                case OrderDirection.None:
                default:
                    return source;
            }
        }

        public static IQueryable<TSource> ThenBy<TSource, TKey>(this IQueryable<TSource> source,
            Expression<Func<TSource, TKey>> keySelector, OrderDirection order)
        {
            var ordered = source as IOrderedQueryable<TSource>;
            if (ordered == null)
                return source;

            switch (order)
            {
                case OrderDirection.Asc:
                    return ordered.ThenBy(keySelector);
                case OrderDirection.Desc:
                    return ordered.ThenByDescending(keySelector);
                case OrderDirection.None:
                default:
                    return source;
            }
        }

        public static IQueryable<TSource> Pagination<TSource, TDto>(this IQueryable<TSource> source, PaginationModel<TDto> model)
        {
            return source.Skip(model.PageSize * (model.PageNumber - 1))
                .Take(model.PageSize);
        }
    }
}
