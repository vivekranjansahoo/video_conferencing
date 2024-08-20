import { Module } from '@nestjs/common';
import { MongodbConfig } from './mongo.config';
@Module({
  providers: [...MongodbConfig],
  exports: [...MongodbConfig],
})
export class ConfigModule {}
