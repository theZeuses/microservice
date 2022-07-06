import amqplib, { Channel, Connection } from "amqplib";
import app_config from '@configs/app_config';

let connection: Connection;
let channel: Channel;

export async function bootstrapRabbitMQ(){
    try{
        connection = await amqplib.connect(app_config.rabbitmq_connection_string);
        channel = await connection.createChannel();
        channel.assertExchange('logging', 'direct', {
            durable: false
        });
        console.log('-----------------RabbitMQ connected-------------');
    }catch(e){ console.log(e)
        throw(e);
    }
}

export async function publishMessagingLog(data: any) {
    channel.publish('logging', 'logs.messaging.all', Buffer.from(JSON.stringify(data)));
}