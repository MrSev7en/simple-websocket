class MultiplayerManager {
  constructor(options) {
    this.address = options?.address || 'ws://localhost';

    this.ws = new WebSocket(this.address);
  }

  async listen() {
    this.ws.onmessage = async (e) => {
      const data = JSON.parse(e.data);

      switch (data.type) {
        case 'ack_response': {
          const parse = await new ACK_RESPONSE(data).parse();

          if (parse) {
            if (experimentalDevelopment) {
              console.log(`[Developer] My username is '${data.client.info.username}'`);
            }

            await this.rfp({
              client: data.client,
              vector: {
                position: {
                  x: player.x,
                  y: player.y
                }
              }
            });
          }

          username = data.client.info.username;

          break;
        }

        case 'rfp_response': await new RFP_RESPONSE(data).add(); break;
        case 'rfp_response_done': await new RFP_RESPONSE().sync(); break;
        case 'upp_response': await new UPP_RESPONSE(data).sync(); break;
        case 'join_response': await new JOIN_RESPONSE(data).sync(); break;
        case 'leave_response': await new LEAVE_RESPONSE(data).sync(); break;
      }
    }
  }

  async ack(info) {
    if (
      !info ||
      !info.s ||
      !info.s.x ||
      !info.s.y
    ) return;

    await new ACK(this.ws, info).send();
  }

  async rfp(info) {
    if (
      !info ||
      !info.client ||
      !info.client.info ||
      !info.client.info.username
    ) return;

    await new RFP(this.ws, info).send();
  }

  async upp(info) {
    if (
      !info ||
      !info.client ||
      !info.client.info ||
      !info.client.info.username ||
      !info.vector ||
      !info.vector.position ||
      !info.vector.position.x ||
      !info.vector.position.y
    ) return;

    await new UPP(this.ws, info).send();
  }
}
