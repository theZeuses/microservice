using System.Security.AccessControl;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using log_service.Models;
using Microsoft.Extensions.Options;

namespace log_service.Services
{

    public class MessagingLogService
    {
        private readonly IMongoCollection<MessagingLog> _messagingLogCollection;

        public MessagingLogService(IOptions<MessagingLogSettings> messagingLogSettings){
            MongoClient client = new MongoClient(messagingLogSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(messagingLogSettings.Value.DatabaseName);
            _messagingLogCollection = database.GetCollection<MessagingLog>(messagingLogSettings.Value.MessagingLogCollectionName);
        }

        public async Task<List<MessagingLog>> GetAsync(){  
            return await _messagingLogCollection.Find(new BsonDocument()).ToListAsync();  
        }  

        public async Task CreateAsync(MessagingLog messagingLog){
            await _messagingLogCollection.InsertOneAsync(messagingLog);
        }
    }
}