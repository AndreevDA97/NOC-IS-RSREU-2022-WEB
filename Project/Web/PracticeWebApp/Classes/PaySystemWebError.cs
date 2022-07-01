namespace PaySystemWebCommon.Classes
{

    public class PaySystemWebError
    {
        public PaySystemWebError(string message)
        {
            Message = message;
        }

        public PaySystemWebError()
        {
        }

        public string Message { get; set; }
    }
}