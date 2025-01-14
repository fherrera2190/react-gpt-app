import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';
interface Options {
  prompt: string;
  voice?: string;
}
export const textToAudioUseCase = async (
  openai: OpenAI,
  { prompt, voice }: Options,
) => {
  const voices = {
    nova: 'nova',
    lisa: 'lisa',
  };

  const selectedVoice = voices[voice] ?? voices.nova;

  const folderPath = path.resolve(__dirname, '../../../generated/audios/');
  console.log('>>>>>>>>>>', folderPath);
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  // const mp3 = await openai.audio.speech.create({
  // });

  return {
    prompt,
    voice: selectedVoice,
  };
};
