class PlayerManager {
    constructor() {
      this.players = [];
    }
  
    async add(pi) {
      if (!await this.includes(pi)) {
        const t = PIXI.Texture.from('assets/sprites/player/sprite.png');
        const p = new PIXI.Sprite(t);
        
        pi.sprite = p;
        this.players.push(pi);
      }
    }
  
    async includes(pi) {
      let has = false;

      await this.players.forEach(async (u) => {
        if (pi.client?.info?.username) {
          if (u.client.info.username === pi.client.info.username) has = true;
        }
      });
  
      return has;
    }

    async remove(pi) {
      if (await this.includes(pi)) {
        this.players = this.players.filter((p) => p.client.info.username !== pi.client.info.username);
      }
    }
  }
  