using System;

namespace TestProjectMain._common
{
    class ConsoleLog
    {
        private String ProcessName { get; set; }

        public ConsoleLog(String name)
        {
            ProcessName = name;
        }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }

        public void Start()
        {
            StartDate = DateTime.Now;
            Console.WriteLine(@"{0}: запущена операция ""{1}""", StartDate, ProcessName);
        }
        public void Finish()
        {
            FinishDate = DateTime.Now;
            Console.WriteLine(@"{0}: завершена операция ""{1}""", FinishDate, ProcessName);
            Console.WriteLine(@"время выполнения ""{0}""", FinishDate - StartDate);
        }
        public void WriteLine(String message)
        {
            Console.WriteLine(@"{0}: {1}", DateTime.Now, message);
        }
    }
}
