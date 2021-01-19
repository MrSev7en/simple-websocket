class LEAVE_RESPONSE {
  constructor(data) {
    this.leave_response = data;
  }

  async sync() {
    if (this.leave_response) {
      const player = await pm.players.find((p) => p.client.info.username === this.leave_response.data.client.info.username);

      await new PlayerVector(player).remove();
      await pm.remove(player);
    }
  }
}
