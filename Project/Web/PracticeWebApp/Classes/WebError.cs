namespace PaySystemWebCommon.Classes
{

    public class WebError
    {
        public WebError(string message)
        {
            Message = message;
        }
        public WebError(string message, object obj)
        {
            Message = message;
            Object = obj;
        }

        public WebError()
        {
        }

        public string Message { get; set; }
        public object Object { get; set; }
    }
}