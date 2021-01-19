this.moveTimeout = -1;

$(this).on('keypress', async (e) => {
  if (this.keys && !this.keys.includes(e.key)) {
    this.keys.push(e.key);
  } else {
    this.keys = [e.key];
  }

  this.startMove();
});

$(this).on('keyup', async (e) => {
  if (this.keys && this.keys.includes(e.key)) {
    this.keys.splice(this.keys.indexOf(e.key), 1);
  }

  this.stopMove();
});

function startMove() {
  if (this.moveTimeout === -1) {
    this.loopMove();
  }
}

function stopMove() {
  if (this.moveTimeout === -1) {
    this.loopMove();
  }
}

function loopMove() {
  this.move();
  this.moveTimeout = setTimeout(loopMove, 10);
}

function move() {
  new PlayerMovement().move(this.keys);
}
