import { useRef, useState } from "react";
import {
  GptMessages,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";
import { prosConsDiscusserStreamGeneratorUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef<AbortController>(new AbortController());

  const isRunning = useRef(false);
  const [isloading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const stream = prosConsDiscusserStreamGeneratorUseCase(
      text,
      abortController.current.signal
    );
    setIsLoading(false);
    setMessages((messages) => [...messages, { text: "", isGpt: true }]);

    for await (const text of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }
    isRunning.current = false;

    //todo useCase
    // const reader = await prosConsDiscusserStreamUseCase(text);
    // setIsLoading(false);

    // if (!reader) return alert("No se pudo obtener el reader");

    // const decoder = new TextDecoder();
    // let message = "";
    // setMessages((messages) => [...messages, { text: message, isGpt: true }]);
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   const decodedChunk = decoder.decode(value, { stream: true });

    //   message += decodedChunk;

    //   setMessages((messages) => {
    //     const newMessages = [...messages];
    //     newMessages[newMessages.length - 1].text = message;
    //     return newMessages;
    //   });
    // }
  };

  return (
    <div className="chat-container ">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="¿Que deseas comparar hoy?" />

          {messages.map((message, index) => {
            if (message.isGpt) {
              return <GptMessages key={index} text={message.text} />;
            }
            return <MyMessage key={index} text={message.text} />;
          })}

          {isloading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe tu pregunta"
        disableCorrections
      />
    </div>
  );
};
