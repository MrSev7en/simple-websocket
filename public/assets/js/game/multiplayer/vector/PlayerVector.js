class PlayerVector {
  constructor(player) {
    this.player = player;
  }

  async spawn() {
    this.player.sprite.width = 32;
    this.player.sprite.height = this.player.sprite.width;
    this.player.sprite.x = this.player.vector.position.x;
    this.player.sprite.y = this.player.vector.position.y;

    container.addChild(this.player.sprite);
  }

  async remove() {
    this.player.sprite.destroy();
  }
}
