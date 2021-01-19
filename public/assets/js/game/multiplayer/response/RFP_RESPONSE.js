class RFP_RESPONSE {
  constructor(data) {
    this.rfp_response = data;
  }

  async add() {
    if (this.rfp_response) {
      await pm.add(this.rfp_response);
    }
  }

  async sync() {
    await pm.players.forEach(async (p) => {
      await new PlayerVector(p).spawn();
    });
  }
}
