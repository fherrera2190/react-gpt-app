import { useState } from "react";
import {
  GptMessages,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isloading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    //todo useCase
    setIsLoading(false);

    //Todo añadir el mensaje de isPgt en true
  };

  return (
    <div className="chat-container ">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
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
