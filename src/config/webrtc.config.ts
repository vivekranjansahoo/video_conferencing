import { registerAs } from '@nestjs/config';

export default registerAs('webrtc', () => ({

    stunServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
    {
      urls: 'stun:stun1.l.google.com:19302',
    },
  ],

}));
