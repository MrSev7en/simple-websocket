import WebSocket from 'ws';
import { UserManager } from './cache/UserManager';

import { ACK } from './packets/ACK';
import { DPC } from './packets/DPC';
import { RFP } from './packets/RFP';
import { UPP } from './packets/UPP';

export class WebSocketManager {
  wss: WebSocket;
  um: UserManager;

  constructor() {
    this.um = new UserManager();
    this.init();

    console.log('[WebSocket] Initialized with success (Main Server #1)');
  }

  async init(): Promise<void> {
    await this.setup();
    await this.listen();
  }

  async setup(): Promise<void> {
    this.wss = new WebSocket.Server({ port: 3000 });
  }

  async listen(): Promise<void> {
    this.wss.on('connection', async (ws: any) => this.connection(ws));
  }

  async connection(ws: any): Promise<void> {
    ws.on('message', async (data: any) => await this.receive(JSON.parse(data), ws));
    ws.on('close', async () => await this.close(ws))
  }

  async close(ws: any): Promise<void> {
    const user: any = this.um.users.find((u: any) => u.ws.socketId === ws.socketId);

    if (user) {
      this.um.users = this.um.users.filter((u: any) => u.ws.socketId !== ws.socketId);

      await this.um.users.forEach(async (u: any): Promise<void> => {
        await DPC(u, user);
      });
    }
  }

  async receive(data: any, ws: any): Promise<void> {
    switch (data.type) {
      case 'ack': await ACK(data, ws, this.um); break;
      case 'rfp': await RFP(data, ws, this.um); break;
      case 'upp': await UPP(data, ws, this.um); break;
    }
  }
}
