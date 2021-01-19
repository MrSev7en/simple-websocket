class UPP_RESPONSE {
  constructor(data) {
    this.upp_response = data;
  }

  async sync() {
    const p = pm.players.filter((_) => _.client.info.username === this.upp_response.client.info.username)[0];

    p.sprite.position.x = this.upp_response.vector.position.x;
    p.sprite.position.y = this.upp_response.vector.position.y;

    pm.players.find((_p) => _p.client.info.username === this.upp_response.client.info.username).vector = {
      x: this.upp_response.vector.position.x,
      y: this.upp_response.vector.position.y
    }
  }
}
