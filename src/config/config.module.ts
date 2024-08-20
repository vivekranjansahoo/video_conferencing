import { Global, Module } from '@nestjs/common';
import { MongodbConfig } from './mongo.config';

@Global()
@Module({
  providers: [...MongodbConfig],
  exports: [...MongodbConfig],
})
export class ConfigurationModule {}
