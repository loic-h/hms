const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER
});

module.exports = async (req, res) => {
  pusher.trigger(req.params.id, req.params.event, {
    body: req.params.body
  });
};
