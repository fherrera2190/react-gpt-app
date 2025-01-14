import { ProsConsDiscusserResponse } from "../../interfaces";

export const prosConsDiscusserUseCase = async (prompt: string) => {
  try {
    console.log(import.meta.env.VITE_GPT_API);
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!resp.ok) throw new Error("No se pudo realizar la peticion");
    const data = (await resp.json()) as ProsConsDiscusserResponse;
    console.log(data);

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      content: "No se pudo realizar la comparacion",
    };
  }
};
