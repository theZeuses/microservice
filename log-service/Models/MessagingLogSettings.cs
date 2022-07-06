namespace log_service.Models
{

    public class MessagingLogSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string MessagingLogCollectionName { get; set; } = null!;
    }
}