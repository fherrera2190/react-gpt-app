import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}
export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;

  const response = await openai.chat.completions.create({
    model: process.env.LLM,
    messages: [
      {
        role: 'system',
        content: `
        Eres un asistente traductor.
        El usuario va a ingresar un texto y el idioma en que se va a traducir.

        tu respuesta debe ser el texto traducido al idioma indicado por el usuario.


        Idioma:${lang}
        Texto:${prompt}`,
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.1,
  });

  return { message: response.choices[0].message.content };
};
