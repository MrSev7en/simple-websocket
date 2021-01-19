/*
  Receive First Position Packet
*/

import { UserManager } from "../cache/UserManager";

export async function RFP(data: any, ws: any, um: UserManager) {
  if (um.includes(data.data)) {
    await um.users.forEach(async (u: any) => {
      if (u.client.info.username === data.data.client.info.username) return;

        await ws.send(JSON.stringify({
          type: 'rfp_response',
          client: {
            info: {
              username: u.client.info.username
            }
          },
          vector: u.vector
        }));
      });

      await ws.send(JSON.stringify({
        type: 'rfp_response_done'
      }));

      um.users.forEach(async (u: any) => {
        if (u.client.info.username === data.data.client.info.username) return;

         u.ws.send(JSON.stringify({
          type: 'join_response',
          client: data.data.client,
          vector: data.data.vector
        }));
      });
    }
}
