import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface RoomData {
    host: string;
    hostSocketId: string;
    members: any[];
}

@Injectable()
export class WebrtcService {

    public rooms:{[roomId: string]: RoomData}={}

    createRoom(userId:string,hostSocketId:string):string {
        const roomId= uuidv4();
        this.rooms[roomId]={ host: userId, hostSocketId:hostSocketId, members:[]};
        return roomId;
    }
}
