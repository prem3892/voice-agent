import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class MemoryService {
  constructor(private redisService: RedisService) {}

  async addMessage(sessionId: string, role: string, content: string) {
    const history = (await this.redisService.get(sessionId)) || [];

    history.push({
      role,
      content,
    });

    await this.redisService.set(sessionId, history);
  }

  async getHistory(sessionId: string) {
    return (await this.redisService.get(sessionId)) || [];
  }
}