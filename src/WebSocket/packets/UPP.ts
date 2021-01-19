/*
  Update Player Position Packet
*/

import { UserManager } from "../cache/UserManager";

export async function UPP(data: any, ws: any, um: UserManager) {
  if (um.includes(data.data)) {
    um.users.find((u: any) => u.client.info.username === data.data.client.info.username).vector = data.data.vector;
    um.users.forEach(async (u: any) => {
      if (u.client.info.username === data.data.client.info.username) return;

      await u.ws.send(JSON.stringify({
        type: 'upp_response',
        client: data.data.client,
        vector: data.data.vector
      }));
    });
  }
}
