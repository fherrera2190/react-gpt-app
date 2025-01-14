import { url } from 'inspector';
import OpenAI from 'openai';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, originalImage, maskImage } = options;

  //   console.log({ prompt, originalImage, maskImage });

  //Todo verificar original image

  const response = await openai.images.generate({
    prompt,
    model: 'llava',
    n: 1,
    size: '512x512',
    quality: 'standard',
    response_format: 'url',
  });

  //guardar la imagen
  console.log(response);
  return {
    url: response.data[0].url,
    localPath: '',
    revised_prompt: response.data[0].revised_prompt,
  };
};
