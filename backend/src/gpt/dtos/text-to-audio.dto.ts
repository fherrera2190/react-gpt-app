import { IsOptional, IsString } from 'class-validator';

export class TextToAudioDto {
  @IsString()
  prompt: string;

  @IsString()
  @IsOptional()
  readonly voice: string;
}
