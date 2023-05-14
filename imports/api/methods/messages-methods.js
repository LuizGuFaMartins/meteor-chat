import { MessagesCollection } from "../collections/messages-collection";

function insertMessage(messageText) {
  MessagesCollection.insert({
    messageText: messageText,
    createdAt: new Date(),
    username: "anonymous",
  });
}

function deleteMessage(id) {
  MessagesCollection.remove(id);
}

Meteor.methods({
  "message.insert": insertMessage,
  "message.delete": deleteMessage,
});
