import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: '127.0.0.1',
      port: 6379,
    });
  }

  async set(key: string, value: any) {
    await this.redis.set(key, JSON.stringify(value));
  }

  async get(key: string) {
    const data = await this.redis.get(key);

    if (!data) return null;

    return JSON.parse(data);
  }
}