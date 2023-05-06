import React from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { MessagesCollection } from "../api/messages";
import moment from "moment/moment";
import { Meteor } from "meteor/meteor";


export const Message = () => {
  const isLoading = useSubscribe("messages");
  const [message, setMessage] = React.useState("");
  const messages = useFind(() => MessagesCollection.find());

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  function createMessage(event) {
    event.preventDefault();

    Meteor.call('message.insert', message);   
    setMessage("");
  }

  return (
    <div className="message-container">
      <h1>Meteor Chat</h1>

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
            <small>{ moment(message.createdAt.toString()).format('DD/MM/YYYY') }</small>
          </div>
        ))}
      </div>
    </div>   
  );
};
