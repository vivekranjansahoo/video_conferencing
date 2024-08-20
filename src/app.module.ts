import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebrtcModule } from './webrtc/webrtc.module';
import { MongodbService } from './mongodb/mongodb.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),WebrtcModule,ConfigurationModule],
  controllers: [AppController],
  providers: [AppService, MongodbService],
})
export class AppModule {}
