import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoiceGateway } from './gateway/voice.gateway';
import { OllamaService } from './ollama/ollama.service';
import { RedisService } from './redis/redis.service';
import { MemoryService } from './memory/memory.service';
import { ElevenlabsService } from './elevenlabs/elevenlabs.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, VoiceGateway,
    OllamaService,
    RedisService,
    MemoryService,
    ElevenlabsService,],
})
export class AppModule {}
