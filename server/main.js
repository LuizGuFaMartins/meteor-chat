import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { MessagesCollection } from "../imports/api/messages";

// async function insertLink({ title, url }) {
//   await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
// }

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
  // If the Links collection is empty, add some data.
  // if ((await MessagesCollection.find().countAsync()) === 0) {
  //   await insertMessage("first message");

  //   // await insertMessage({
  //   //   title: 'Follow the Guide',
  //   //   url: 'https://guide.meteor.com',
  //   // });

  //   // await insertMessage({
  //   //   title: 'Read the Docs',
  //   //   url: 'https://docs.meteor.com',
  //   // });

  //   // await insertMessage({
  //   //   title: 'Discussions',
  //   //   url: 'https://forums.meteor.com',
  //   // });
  // }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("messages", function () {
    return MessagesCollection.find();
  });
});
