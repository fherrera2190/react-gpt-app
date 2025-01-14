import { useState } from "react";
import { MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { orthographyUseCase } from "../../../core/use-cases";
import { GptOrthographyMessage } from "../../components/chat-bubbles/GptOrthographyMessage";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isloading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    //todo useCase
    const { ok, errors, message, userScore } = await orthographyUseCase(text);
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la peticion", isGpt: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: {
            userScore,
            errors,
            message,
          },
        },
      ]);
    }

    setIsLoading(false);

    //Todo añadir el mensaje de isPgt en true
  };

  return (
    <div className="chat-container ">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message, index) => {
            if (message.isGpt) {
              return (
                <GptOrthographyMessage
                  key={index}
                  errors={message.info?.errors || []}
                  userScore={message.info?.userScore || 0}
                  message={message.info?.message || ""}
                />
              );
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
      {/* <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe tu pregunta"
      /> */}
      {/* <TextMessageBoxSelect
        options={[{ id: "1", text: "Hola" }]}
        onSendMessage={() => {
          console.log("first");
        }}
      /> */}
    </div>
  );
};
