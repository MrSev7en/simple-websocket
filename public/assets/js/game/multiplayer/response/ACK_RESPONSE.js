class ACK_RESPONSE {
  constructor(data) {
    this.ack_response = data;
  }

  async parse() {
    let _ = false;

    if (
      this.ack_response.status.type === 200 &&
      this.ack_response.status.message === 'OK'
    ) {
      if (experimentalDevelopment) {
        console.log('[Developer] Connected with success to WebSocket server.');
      }

      _ = true;
    } else {
      if (experimentalDevelopment) {
        console.log('[Developer] Failed connect to WebSocket server.');
      }

      alert(`Failed to connect at master... Try again later!\n${this.ack_response.status.message} (${this.ack_response.status.type})`);
    }

    return _;
  }
}
