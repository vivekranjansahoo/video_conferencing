import { Global, Module } from '@nestjs/common';
import { MongodbConfig } from './mongo.config';
import { ConfigModule } from '@nestjs/config';
import webrtcConfig from './webrtc.config';

@Global()
@Module({
  imports: [ConfigModule.forRoot({
    load: [webrtcConfig],
  })],
  providers: [...MongodbConfig],
  exports: [...MongodbConfig],
})
export class ConfigurationModule {}
