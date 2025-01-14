import { OrthographyResponse } from "../../interfaces/orthography.response";

export const orthographyUseCase = async (prompt: string) => {
  try {
    console.log(import.meta.env.VITE_GPT_API);
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );
    console.log(resp);
    if (!resp.ok) throw new Error("No se pudo realizar la peticion");
    const data = (await resp.json()) as OrthographyResponse;
    console.log(data);

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No se pudo realizar la peticion",
    };
  }
};
