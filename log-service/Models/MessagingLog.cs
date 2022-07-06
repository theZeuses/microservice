using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace log_service.Models
{

    public class MessagingLog
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string room_uuid { get; set; } = null!;
        public string member_uuid { get; set; } = null!;
        public string timestamp { get; set; } = null!;
    }
}