import badWords from "bad-words";
import { Meteor } from "meteor/meteor";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import moment from "moment/moment";
import React from "react";
import { MessagesCollection } from "../api/collections/messages-collection";

export const Message = () => {
  const isLoading = useSubscribe("messages");
  const [message, setMessage] = React.useState("");
  const messages = useFind(() => MessagesCollection.find());
  
  const filter = new badWords({ list: ["palavrão1", "palavrão2"] });

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  function createMessage(event) {
    event.preventDefault();

    if (filter.isProfane(message)) {
      alert(
        "Mensagem contém palavras inadequadas. Por favor, revise sua mensagem antes de enviar."
      );
      return;
    }

    Meteor.call("message.insert", message);
    setMessage("");
  }

  function deleteMessages() {
    let list = messages;
    list.forEach((message) => {
      Meteor.call("message.delete", message._id);
    });
  }

  return (
    <div className="message-container">
      <h1>Meteor Chat</h1>

      <button className="close" onClick={deleteMessages}>
        Clear messages
      </button>

      <form className="input-box" onSubmit={createMessage}>
        <input
          placeholder="Add your message..."
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
      </form>
      <div className="message-box">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <span>{message.username}</span>
            <p>{message.messageText}</p>

            <small>
              {moment(message.createdAt.toString()).format(
                "DD/MM/YYYY - HH:mm"
              )}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};
