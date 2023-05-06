import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "../imports/api/messages";

Meteor.methods({
  "message.insert"(messageText) {
    insertMessage(messageText);
  },
});

const insertMessage = (messageText) =>
  MessagesCollection.insert({
    messageText: messageText,
    createdAt: new Date(),
    username: "anonymous",
  });

Meteor.startup(async () => {
  Meteor.publish("messages", function () {
    return MessagesCollection.find();
  });
});
