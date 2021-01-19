class ACK {
  constructor(ws, info) {
    this.ws = ws;
    this.info = info;
  }

  async send() {
    await this.ws.send(JSON.stringify({ type: 'ack', data: this.info }));
  }
}
