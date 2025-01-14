import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

interface Options {
  prompt: string;
}

const correctionResponse = z.object({
  userScore: z.number(),
  message: z.string(),
  errors: z.array(z.string()),
});

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const completion = await openai.beta.chat.completions.parse({
    model: process.env.LLM,
    temperature: 0.1,

    messages: [
      {
        role: 'system',
        content: `
        Eres un experto profesor de ortografía y gramática en español.
        Tu tarea será analizar textos que te proporcionaré, detectar posibles errores ortográficos, gramaticales o de puntuación, y corregirlos palabra por palabra.

        Además, debes:
          
        Revisar palabra por palabra en el texto.
        Calcular un porcentaje de aciertos (userScore) del usuario basado en la cantidad de palabras correctamente escritas en el texto.
        Revisar detalladamente el uso correcto de tildes y acentos.
        Si no se encuentran errores, debes felicitar al usuario con un mensaje motivador acompañado de emojis.
        Sé claro, educativo y amable en tus respuestas.

        userScore =   number of correct words / total number of words * 100

        Estructura de la respuesta:
      {
        userScore: number, //porcentaje de aciertos
        message: string, //explaination of the correction
        errors: string[], //[ error1->correction, error2->correction, ...]
        }
        `,
      },
      { role: 'user', content: options.prompt },
    ],

    response_format: zodResponseFormat(correctionResponse, 'correction'),
  });

  return completion.choices[0].message.parsed;
};
