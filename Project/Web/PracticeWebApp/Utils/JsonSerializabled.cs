using System;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace Utils
{
    public class JsonSerializabled<T>
    {
        public static T FromJson(string jsonString)
        {
            return JsonConvert.DeserializeObject<T>(jsonString);
            //var serializer = new DataContractJsonSerializer(typeof(T));
            //return (T)(serializer.ReadObject(new MemoryStream(Encoding.UTF8.GetBytes(jsonString))));
        }

        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
            //var serializer = new DataContractJsonSerializer(typeof(T));
            //var stream = new MemoryStream();
            //serializer.WriteObject(stream, this);
            //return Encoding.UTF8.GetString(stream.ToArray());
        }

        public static string ToJson(object obj)
        {
            return obj == null ? null : JsonConvert.SerializeObject(obj);
        }
    }

    public static class JsonSerializabled
    {
        /// <summary>
        /// Безопасная десериализация JSON строки в объект заданного класса (с ошибкой)
        /// </summary>
        public static T ParseJsonOrDefault<T>(string json, out Exception error)
        {
            try
            {
                error = null;
                if (json == null) return default(T);
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.MissingMemberHandling = MissingMemberHandling.Error;
                return JsonConvert.DeserializeObject<T>(json, settings);
            }
            catch (Exception ex)
            {
                error = ex;
                return default(T);
            }
        }
        /// <summary>
        /// Безопасная десериализация JSON строки в объект заданного класса
        /// </summary>
        public static T ParseJsonOrDefault<T>(string json)
        {
            return ParseJsonOrDefault<T>(json, out var nullRef);
        }
    }
}
