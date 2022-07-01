using System.Collections.Generic;

namespace Utils
{
    public class JsonSerializabledList<T> : JsonSerializabled<JsonSerializabledList<T>>
    {
        public int TotalCount { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}