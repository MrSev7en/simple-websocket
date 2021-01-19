class JOIN_RESPONSE {
  constructor(data) {
    this.join_response = data;
  }

  async sync() {
    if (this.join_response) {
      await pm.add(this.join_response);
      await new PlayerVector(this.join_response).spawn();
    }
  }
}
