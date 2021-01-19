import { WebSocketManager } from './WebSocket/WebSocket';
import { Express } from './Express';

console.clear();
console.log('[Gateway] Initialized with success!');

new WebSocketManager();
new Express().listen();
