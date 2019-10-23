import React, { useEffect, useState } from "react";
import { SocketService } from "./SocketService";
import { ChatMessage } from "./types";
const socketService = new SocketService();

const SocketSubscriber: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socketService.init();

    const observable = socketService.onMessage();

    observable.subscribe((message: ChatMessage) => {
      messages.push(message);
      setMessages([...messages]);
    });

    return function cleanup(): void {
      socketService.disconnect();
    };
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSendClick = (): void => {
    const author: string = "Nathan Hall";
    if (inputValue) {
      socketService.send({
        author,
        message: inputValue
      });
      setInputValue("");
    }
  };

  return (
    <div>
      <div>
        <h3>Messages</h3>
        {messages.map((message, i) => {
          return (
            <div key={i}>
              <p>{message.author}</p>
              <p>{message.message}</p>
            </div>
          );
        })}
      </div>
      <input
        placeholder="Type your messsage here..."
        onChange={handleInputChange}
        value={inputValue}
      />
      <p>
        <button onClick={handleSendClick}>Send Message</button>
      </p>
    </div>
  );
};

export default SocketSubscriber;
