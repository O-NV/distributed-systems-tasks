const express = require("express");
const cors = require("cors");
const { Kafka } = require('kafkajs');
const { DateTime } = require('luxon');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const kafka = new Kafka({
  brokers: [process.env.kafkaHost]
});

function timeInterval(initTime, endTime) {
  const diff = endTime.diff(initTime, 'seconds').toObject();
  return diff.seconds;
}

const userBlocked = {
  "users-blocked": [
  ]
}

const countLoginUsers = {};
const timestapm = [];

app.get("/blocked", async (req, res) => {
   
  const consumer = kafka.consumer({ groupId: 'test-group' })
  await consumer.connect()
  await consumer.subscribe({ topic: 'topic-name', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message, key }) => {
      console.log({
        partition,
        offset: message.offset,
        key: message.key.toString(),
        value: message.value.toString(),
      })

      const user = message.key.toString();
      console.log(user)

      if(!countLoginUsers[user]) {
        countLoginUsers[user] = {
          time: timestapm.push(DateTime.now()),
          count: 1
        }
      } 
      else {
        countLoginUsers[user].count += 1;
        countLoginUsers[user].time = timestapm.push(DateTime.now());        
               
        if(countLoginUsers[user].count >= 5 ) {
          const initTime = timestapm[countLoginUsers[user].count - 5];
          const finalTime = timestapm[countLoginUsers[user].count - 1];
          if (timeInterval(initTime, finalTime ) <= 60) {
            userBlocked['users-blocked'].push(user);
          }
          console.log(timeInterval(initTime, finalTime ));
        }
      }
      console.log(countLoginUsers);
    },
  })
  res.send(userBlocked);
});


app.listen(port, () => {
  console.log(`API RUN AT http://localhost:${port}`);
});
