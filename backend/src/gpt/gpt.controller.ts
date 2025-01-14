import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, TranslateDto } from './dtos';
import { Response } from 'express';
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
}
