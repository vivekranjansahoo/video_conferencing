import { Body, Controller, Param, Post } from '@nestjs/common';
import { WebrtcService } from './webrtc.service';
import { error } from 'console';

@Controller('webrtc')
export class WebrtcController {

    constructor(private webrtcService:WebrtcService) {}

    @Post('create-room')
    createRoom(@Body() data:{ userId: string, hostSocketId: string }) : object {

        const { userId, hostSocketId } =data;
        if(!userId || !hostSocketId){
            throw error;
        }
        console.log(userId,hostSocketId)
        const roomId=this.webrtcService.createRoom(userId, hostSocketId);
        return {roomId:roomId};
    }
}
