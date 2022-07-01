using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace PaySystemServer.Common
{
    public class DebugTextWriter : TextWriter
    {
        private bool parseParams;

        /// <summary>Класс отладки формируемых запросов к базе данных</summary>
        /// <param name="parseParams">Авто-подстановка параметров</param>
        public DebugTextWriter(bool parseParams = false): base()
        {
            this.parseParams = parseParams;
        }

        public override void Write(char[] buffer, int index, int count)
        {
            Write(new String(buffer, index, count));
        }

        private string bufferedString;
        public override void Write(string value)
        {
            if (parseParams)
            {
                if (value.StartsWith("-- @p"))
                {
                    var paramName = new Regex(@"@p\d+").Match(value).Value;
                    var paramValue = new Regex(@"\[.+\]").Match(value).Value;
                    paramValue = paramValue.Replace("[", "").Replace("]", "");
                    if (value.Contains("Input DateTime"))
                    {
                        if (DateTime.TryParse(paramValue, out var date))
                            paramValue = "'" + date.ToString("yyyy-MM-dd HH':'mm':'ss") + "'";
                        else
                            paramValue = "NULL";
                    }
                    if (value.Contains("Input VarChar"))
                    {
                        paramValue = "'" + paramValue + "'";
                    }
                    bufferedString = Regex.Replace(bufferedString, paramName + @"(?!\d)", paramValue);
                    if (!bufferedString.Contains("@p"))
                        Debug.Write(bufferedString + "\r\n");
                }
                if (value.StartsWith("\r\n") || value.StartsWith("--"))
                    return;
                if (value.Contains("@p"))
                    bufferedString = value;
                else
                    Debug.Write(value);
            }
            else
                Debug.Write(value);
        }

        public override Encoding Encoding
        {
            get { return System.Text.Encoding.Default; }
        }
    }
}
