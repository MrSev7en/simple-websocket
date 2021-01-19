connected = false;
experimentalDevelopment = false;

setInterval(() => {
  if (!this.isActivated && experimentalDevelopment) {
    this.isActivated = true;
    this.isEnabled();
  }
}, 50);
function isEnabled() {
  console.log('Enabled experimental development mode.');
}
