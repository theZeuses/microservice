using System.Data;
using System;
using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;
using log_service.Models;

namespace log_service.Services
{
    public class RabbitMQService : BackgroundService
    {
        private IServiceProvider _sp;
        private ConnectionFactory _factory;
        private IConnection _connection;
        private IModel _channel;
        private string _queueName;

        public RabbitMQService(IServiceProvider sp){
            _sp = sp;
            //create a connection factory
            _factory = new ConnectionFactory() { HostName = "rabbitmq", Port = 5672, UserName = "guest", Password = "guest" };

            //connect using the factory
            _connection = _factory.CreateConnection();

            Console.WriteLine("--------------RabbitMQ Connected----------------");
            //create a channel
            _channel = _connection.CreateModel();

            //define the exchange pattern
            _channel.ExchangeDeclare(exchange: "logging", type: "direct", durable: false);

            //get a queue dynamically assigned by rabbitmq system
            _queueName = _channel.QueueDeclare().QueueName;

            //bind the queue with specific routing key/routing pattern
            _channel.QueueBind(queue: _queueName, exchange: "logging", routingKey: "logs.messaging.all");
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken){
            if (stoppingToken.IsCancellationRequested){
                _channel.Dispose();
                _connection.Dispose();

                return Task.CompletedTask;
            }
            //create a consumer
            var consumer = new EventingBasicConsumer(_channel);
            //register event listener
            consumer.Received += (model, ea) => {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Task.Run(async () => {
                    dynamic obj = JsonSerializer.Deserialize<MessagingLog>(message);
                    var log = new MessagingLog();
                    log.room_uuid = obj.room_uuid;
                    log.member_uuid = obj.member_uuid;
                    log.timestamp = obj.timestamp;

                    using (var scope = _sp.CreateScope())
                    {
                        var db = scope.ServiceProvider.GetRequiredService<MessagingLogService>();
                        await db.CreateAsync(log);
                    }
                });
            };

            //consume the message
            _channel.BasicConsume(queue: _queueName, autoAck: true, consumer: consumer);

            Console.WriteLine("Messaging Logs logger Consuming");
            return Task.CompletedTask;
        }
    }
}