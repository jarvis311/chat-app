import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import '../style/chat.css';

const Chat = ({ socket, username, group }) => {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const clearUseEffect = useRef(false)

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        group: group,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (clearUseEffect.current === false) {
      socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
      return () => {
        clearUseEffect.current = true;
      }
    }
  }, [socket]);

  return (
    <div className="chat_container">
      <div className="chat-header">
        <p>{group} Group</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div className="message" id={username === messageContent.author ? "you" : "other"}>
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input type="text" value={currentMessage} placeholder="Type your message.." onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </div>
    </div>
  )
}

export default Chat