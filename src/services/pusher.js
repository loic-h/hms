import globals from "../utils/globals";
import Pusher from "pusher-js";

Pusher.logToConsole = process.env.node === "development";

const pusher = new Pusher(globals.env.pusher.key, {
  cluster: globals.env.pusher.cluster
});

let channel;

export const subscribe = (id) => {
  channel = pusher.subscribe(`private-${id}`);
  return new Promise((resolve, reject) => {
    channel.bind('pusher:subscription_succeeded', resolve);
    channel.bind('pusher:subscription_error', reject);
  });
};

export const unsubscribe = (id) => {
  pusher.unsubscribe(`private-${id}`);
};

export const push = (event, body) => {
  console.log("push", `client-${event}`, body)
  channel.trigger(`client-${event}`, body);
};

export const listen = (event, cb) => {
  console.log("listen", `client-${event}`);
  channel.bind(`client-${event}`, cb);
};
