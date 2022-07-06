import mongoose from 'mongoose';
import app_config from '@configs/app_config';

export const bootstrapMongo = () => {
  const dbConnectionString = app_config.db_connection_string;
  
  const connect = () => {
    mongoose
      .connect(
        dbConnectionString
      )
      .then(() => {
        return console.info(`Successfully connected to ${dbConnectionString}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};