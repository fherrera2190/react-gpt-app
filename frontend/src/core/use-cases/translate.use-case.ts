import { TranslateResponse } from "../../interfaces/translate.response";

export const translateUseCase = async (
  prompt: string,
  selectedOption: string
) => {
  try {
    console.log(import.meta.env.VITE_GPT_API);
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, lang: selectedOption }),
    });
    console.log(resp);
    if (!resp.ok) throw new Error("No se pudo realizar la traduccion");
    const data = (await resp.json()) as TranslateResponse;
    console.log(data);

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo realizar la traduccion",
    };
  }
};
