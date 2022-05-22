const express = require("express");
const cors = require("cors");
const { Kafka } = require('kafkajs')

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const kafka = new Kafka({
  brokers: [process.env.kafkaHost]
});

const producer = kafka.producer();

app.post("/login", async (req, res) => {
  const user = req.body
    await producer.connect()
    await producer.send({
      topic: 'topic-name',
      messages: [
      { 
        key: JSON.stringify(user.user), 
        value: JSON.stringify(user) 
      },
    ],
  })
  
  res.send("Logeado");
});

app.listen(port, () => {
  console.log(`API RUN AT http://localhost:${port}`);
});