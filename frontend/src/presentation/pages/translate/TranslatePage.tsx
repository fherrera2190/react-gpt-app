import { useState } from "react";
import {
  GptMessages,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
} from "../../components";
import { translateUseCase } from "../../../core/use-cases/translate.use-case";

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {
  const [isloading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);

    const newMessage = `Traduce: "${text}" al idioma ${selectedOption}`;
    setMessages((prev) => [...prev, { text: newMessage, isGpt: false }]);

    const { ok, message } = await translateUseCase(newMessage, selectedOption);
    //todo useCase
    setIsLoading(false);

    if (!ok) {
      return alert(message);
    }

    setMessages((prev) => [...prev, { text: message, isGpt: true }]);
  };

  return (
    <div className="chat-container ">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="¿Que quieres que traduzca hoy?" />

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
      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe tu pregunta"
        options={languages}
      />
    </div>
  );
};
