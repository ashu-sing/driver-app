const router = require("express").Router();
const { protect } = require("../middlewares/auth.js");
const clientCreator = require("twilio");

const data = [1, 2, 3, 4, 5];

router.get("/", protect, (req, res) => {
  res.json(data);
});

router.post("/sendMessage", (req, res) => {
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Set environment variables for your credentials
  // Read more at http://twil.io/secure
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = clientCreator(accountSid, authToken);
  client.messages
    .create({
      body: "Hello from Twilio",
      from: "+13613229445",
      to: "+919336339270",
    })
    .then((message) => console.log(message.sid))  ;

  res.json({ message: "Message sent" });
});
module.exports = router;
