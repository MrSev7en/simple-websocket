/*
  Dispose Player Connection Packet
*/

export async function DPC(users: any, leaving: any) {
  await users.ws.send(JSON.stringify({
    type: 'leave_response',
    data: {
      client: {
        info: {
          username: leaving.client.info.username
        }
      },
      vector: leaving.vector
    }
  }));
}
