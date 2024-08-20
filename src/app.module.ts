import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebrtcModule } from './webrtc/webrtc.module';
import { MongodbService } from './mongodb/mongodb.service';

@Module({
  imports: [WebrtcModule],
  controllers: [AppController],
  providers: [AppService, MongodbService],
})
export class AppModule {}
