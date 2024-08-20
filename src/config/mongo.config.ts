import { MongoClient, Db } from 'mongodb';
import { ConfigService } from '@nestjs/config';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
const DATABASE_NAME = 'video';

export const MongodbConfig = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (config:ConfigService): Promise<Db> => {
      //   const client = new MongoClient('mongodb://localhost:27017');
      
      const client = new MongoClient(config.get<string>('MONGO_DB'));
      await client.connect();
      console.log("Db connected");
      return client.db(DATABASE_NAME);
    },
    inject: [ConfigService],
  },
];
