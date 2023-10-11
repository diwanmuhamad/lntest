import express from "express";
import { zbd } from "@zbd/node";

const ZBD_API_KEY = "w6XRU4yp1MW7jzZG5cVFFwcXGQw9j9VY";
const ZBD = new zbd(ZBD_API_KEY);

// Create Express app
const app = express();

// Creating a Bitcoin Lightning payment request
app.get("/request", async (req, res) => {
  try {
    // @ts-ignore
    const data = await ZBD.createCharge({
      amount: "100000", // 100 satoshis (100,000 msats)
      description: "Express + ZBD!",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Send a payment to a Bitcoin Lightning Address
app.get("/send", async (req, res) => {
  console.log("Test");
  try {
    const data = await ZBD.sendLightningAddressPayment({
      lnAddress: "restlessmountain671525@getalby.com", // Who is the recipient?
      amount: "100000", // 100 satoshis (100,000 msats)
      comment: "Express + ZBD!",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/sendtoUser", async (req, res) => {
  try {
    const options = {
      method: "POST",
      headers: { apikey: ZBD_API_KEY, "Content-Type": "application/json" },
      body: '{"amount":"10000","gamertag":"e8d8e583","description":"TESTING"}',
    };

    fetch("https://sandbox-api.zebedee.io/v0/gamertag/send-payment", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        res.status(200).json({ response });
      })
      .catch((err) => console.error(err));
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log("Express server w/ ZBD listening on http://localhost:3000");
});
