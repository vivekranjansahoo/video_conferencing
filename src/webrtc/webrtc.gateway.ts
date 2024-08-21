import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebrtcService } from './webrtc.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

@WebSocketGateway()
export class WebrtcGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private clients: Map<string, string> = new Map();

  constructor(private webrtcService:WebrtcService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client.id);
    this.server.emit('user-disconnected', client.id); //change
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(client: Socket, room: string): Promise<void> {
    if(this.webrtcService.rooms[room].members.length === 2){
      client.emit('error',"Room is full.")
      return
     }
    console.log(`Client ${client.id} joined room: ${room}`);
    client.join(room);
    this.webrtcService.rooms[room].members.push(client);
    this.clients.set(client.id, room);

    // Notify others in the room
    client.to(room).emit('user-connected', client.id);
  }

  @SubscribeMessage('leave-room')
  async handleLeaveRoom(client: Socket, payload: { room: string, userId: string }): Promise<void> {
    const { room, userId } = payload; 
    console.log(`Client ${client.id} left room: ${room}`);
    
    client.leave(room);
    const roomDetails = this.webrtcService.rooms[room];
    console.log(roomDetails)

    if (roomDetails.host === userId) {
      roomDetails.members.forEach((member) => {
        console.log("Dsiconnecting...")
        member.leave(room);
        this.clients.delete(member.id);
        member.disconnect();
      });
    } else {
      this.clients.delete(client.id);
    }

    // Notify others in the room
    client.to(room).emit('user-disconnected', client.id);
  }


  @SubscribeMessage('webrtc-signal')
  async handleWebrtcSignal(client: Socket, payload: any): Promise<void> {
    const signal = payload;
    // console.log(`Received signal from ${client.id} for ${target}`);
    
    // Relay the signal to the target client
    // this.server.to(target).emit('webrtc-signal', {
    //   sender: client.id,
    //   signal,
    // });

    client.broadcast.emit('webrtc-signal', {
      signal
    })

  }

  @SubscribeMessage('ice-candidate')
  async handleIceCandidate(client: Socket, payload: any): Promise<void> {
    const { signal } = payload;
    // console.log(`Received signal from ${client.id} for ${target}`);
    
    // Relay the signal to the target client
    // this.server.to(target).emit('webrtc-signal', {
    //   sender: client.id,
    //   signal,
    // });

    client.broadcast.emit('ice-candidate', {
      signal
    })
  }
}



  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
