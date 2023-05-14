import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "../imports/api/collections/messages-collection";
import "../imports/api/methods/messages-methods";

Meteor.startup(async () => {
  Meteor.publish("messages", function () {
    return MessagesCollection.find();
  });
});
