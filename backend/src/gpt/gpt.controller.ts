import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, TextToAudioDto, TranslateDto } from './dtos';
import { Response } from 'express';
import { ImageGenerationDto } from './dtos/image-geneartion.dto';
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('translate')
  translate(@Body() translateDto: TranslateDto) {
    return this.gptService.translate(translateDto);
  }

  @Post('text-to-audio')
  textToAudio(@Body() textToAudioDto: TextToAudioDto) {
    return this.gptService.textToAudio(textToAudioDto);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.prosConsDicusser(orthographyDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() orthographyDto: OrthographyDto,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.prosConsDicusserStream(orthographyDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0]?.delta?.content ?? '';
      res.write(piece);
    }

    res.end();
  }

  @Post('image-generation')
  async imageGeneration(@Body() imageGenerationDto: ImageGenerationDto) {
    return await this.gptService.imageGeneration(imageGenerationDto);
  }
}
