import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { OllamaService } from '../ollama/ollama.service';
import { MemoryService } from '../memory/memory.service';
import { ElevenlabsService } from '../elevenlabs/elevenlabs.service';

@WebSocketGateway({
  cors: true,
})
export class VoiceGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private ollamaService: OllamaService,
    private memoryService: MemoryService,
    private elevenlabsService: ElevenlabsService,
  ) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('user-message')
  async handleMessage(client: Socket, payload: any) {
    const { text, sessionId } = payload;

    const history = await this.memoryService.getHistory(sessionId);

    await this.memoryService.addMessage(sessionId, 'user', text);

    const aiReply = await this.ollamaService.chat(text, history);

    await this.memoryService.addMessage(
      sessionId,
      'assistant',
      aiReply,
    );

    const audio = await this.elevenlabsService.generateSpeech(aiReply);

    client.emit('ai-response', {
      text: aiReply,
      audio: audio.toString('base64'),
    });
  }
}