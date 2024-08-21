import { Body, Controller, Param, Post } from '@nestjs/common';
import { WebrtcService } from './webrtc.service';

@Controller('webrtc')
export class WebrtcController {

    constructor(private webrtcService:WebrtcService) {}

    @Post('create-room')
    createRoom(@Body() data:{ userId: string }) : string {
        // console.log(userId)
        // if(!userId)
        //     throw Error("Expected userId");
        const { userId } =data;
        const roomId=this.webrtcService.createRoom(userId);
        return roomId;
    }



}
