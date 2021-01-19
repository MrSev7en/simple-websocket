async function init() {
  PIXI.utils.skipHello();
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  await this.setup();
}

async function setup() {
  this.app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x4287f5,
    resolution: window.devicePixelRatio || 1,
  });
  
  $('body').append(app.view);
}

this.init();

let username = 'Connecting...';

const mm = new MultiplayerManager({ address: config.servers.websocket.url });
const pm = new PlayerManager();

const container = new PIXI.Container();
app.stage.addChild(container);

const texture = PIXI.Texture.from('assets/sprites/player/sprite.png');
const player = new PIXI.Sprite(texture);

const position = { x: Math.floor(Math.random() * (500 - 100 + 1) + 100), y: Math.floor(Math.random() * (500 - 100 + 1) + 100) };

player.width = 32;
player.height = player.width;
player.x = position.x;
player.y = position.y;

container.addChild(player);

mm.ws.addEventListener('open', async () => {
  connected = true;

  await mm.listen();
  await mm.ack({ s: { x: player.x, y: player.y } });
});
