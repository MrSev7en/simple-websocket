class PlayerMovement {
  async move(direction) {
    if (direction) {
      const original = [player.x, player.y];

      if (connected) {
        for (let i = 0; i < direction.length; i++) {
          switch (direction[i]) {
            case 'w':
              player.y -= 5;
              break;
            case 'a':
              player.x -= 5;
              break;
            case 's':
              player.y += 5;
              break;
            case 'd':
              player.x += 5;
              break;
          }
        }
      }

      if (connected && direction && ((player.x != original[0]) || (player.y != original[1]))) {
        await mm.upp({
          client: {
            info: {
              username
            }
          },
          vector: {
            position: {
              x: player.x,
              y: player.y
            }
          }
        });
      }
    }
  }
}
