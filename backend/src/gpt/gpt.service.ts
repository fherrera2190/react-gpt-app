import { Injectable } from '@nestjs/common';
import {
  imageGenerationUseCase,
  orthographyCheckUseCase,
  prosConsDicusserStreamUseCase,
  textToAudioUseCase,
} from './use-cases';
import {
  ImageGenerationDto,
  OrthographyDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import OpenAI from 'openai';
import { ProsConsDiscusserDto } from './dtos/prosconsdiscusser.dto';
import { prosConsDicusserUseCase } from './use-cases/prosconsdiscusser.use-case';
import { translateUseCase } from './use-cases/translate.use-case';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    console.log(orthographyDto);
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translate(translateDto: TranslateDto) {
    return await translateUseCase(this.openai, translateDto);
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, imageGenerationDto);
  }
}
