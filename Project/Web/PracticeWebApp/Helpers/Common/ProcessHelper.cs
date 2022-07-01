using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;

namespace PracticeWebApp.Helpers
{
    public static class ProcessHelper
    {
        /// <summary>
        /// Создание нового скрытого процесса
        /// </summary>
        public static Process GetNew(string filePathToExe, string argumentString = null)
        {
            var process = new Process();
            process.StartInfo = new ProcessStartInfo
            {
                FileName = filePathToExe,
                Arguments = argumentString,
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                WindowStyle = ProcessWindowStyle.Hidden,
                StandardOutputEncoding = Encoding.GetEncoding(866)
            };
            return process;
        }
        /// <summary>
        /// Запуск приложения с аргументами
        /// </summary>
        public static void RunApp(string filePathToExe, string argumentString = null,
            TimeSpan? timeForWaiting = null)
        {
            using (var process = GetNew(filePathToExe, argumentString))
            {
                try
                {
                    process.Start();
                    process.WaitForExit((int)(timeForWaiting?.TotalMilliseconds ?? -1));
                }
                catch (Exception)
                {
                    if (!process.HasExited)
                        process.Kill();
                    throw;
                }
            }
        }
        /// <summary>
        /// Запуск консольной команды
        /// </summary>
        public static void RunCmd(string consoleCommand, TimeSpan? timeForWaiting = null)
        {
            using (var process = GetNew("cmd.exe"))
            {
                try
                {
                    process.Start();
                    var baseStream = process.StandardInput.BaseStream;
                    using (var sr = process.StandardOutput)
                    using (var sw = new StreamWriter(baseStream, sr.CurrentEncoding))
                    {
                        sw.WriteLine(consoleCommand);
                    }
                    process.WaitForExit((int)(timeForWaiting?.TotalMilliseconds ?? -1));
                }
                catch (Exception)
                {
                    if (!process.HasExited)
                        process.Kill();
                    throw;
                }
            }
        }
    }
}