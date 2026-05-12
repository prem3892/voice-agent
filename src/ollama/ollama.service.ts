import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OllamaService {
  async chat(message: string, history: any[] = []) {
    const response = await axios.post(
      process.env.OLLAMA_URL + '/api/chat',
      {
        model: 'llama3.1:8b',
        messages: [
          {
            role: 'system',
            content: `
            You are a professional AI voice assistant.
            Keep replies short and conversational.
            Speak naturally.
            `,
          },
          ...history,
          {
            role: 'user',
            content: message,
          },
        ],
        stream: false,
      },
    );

    console.log(response.data)

    return response.data.message.content;
  }
}