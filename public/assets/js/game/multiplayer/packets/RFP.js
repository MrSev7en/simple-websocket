class RFP {
  constructor(ws, info) {
    this.ws = ws;
    this.info = info;
  }

  async send() {
    await this.ws.send(JSON.stringify({ type: 'rfp', data: this.info }));
  }
}
