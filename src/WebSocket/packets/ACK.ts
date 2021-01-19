/*
  Acknowledgement Packet
*/

import { v4 as uuidv4 } from 'uuid';
import { UserManager } from "../cache/UserManager";

export async function ACK(data: any, ws: any, um: UserManager): Promise<void> {
  const username = `Guest ${Math.floor(Math.random() * (999999 - 111111 + 1) + 111111)}`;
  const add = await um.add({
    client: {
      address: ws._socket.remoteAddress,
      id: um.users.length,
      info: {
        username
      }
    },
    vector: {
      position: {
        x: data.data.s.x,
        y: data.data.s.y
      }
    },
    ws
  });

  if (add) {
    ws.socketId = uuidv4();

    await ws.send(JSON.stringify({
      type: 'ack_response',
      client: {
        info: {
          username
        }
      },
      status: {
        type: 200,
        message: 'OK'
      }
    }));
  } else {
    await ws.send(JSON.stringify({
      type: 'ack_response',
      status: {
        type: 421,
        message: 'This user is already online.'
      }
    }));
  }
}
