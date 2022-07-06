import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT ?? 8001,
    db_connection_string: process.env.DB_CONNECTION_STRING ?? 'nil',
    rabbitmq_connection_string: process.env.RABBITMQ_CONNECTION_STRING ?? 'amqp://rabbitmq:5672',
    recommended_bycrypt_rounds: 12
}