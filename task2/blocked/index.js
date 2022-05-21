const express = require("express");
const cors = require("cors");
const { Kafka } = require('kafkajs');
const { DateTime } = require('luxon');
const fs = require("fs");

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

function writeJson(params){
  fs.readFile('./blocked.json',function(err,data){
      if(err){
          return console.error(err);
      }
      
      const person = JSON.parse(data.toString());
      console.log(person);
      person['users-blocked'].push(params);
      person.total = person['users-blocked'].length;
      console.log(person.data);
      const str = JSON.stringify(person, null, 2);
      fs.writeFile('blocked.json',params,function(err){
        if(err){
          console.error(err);
        }
        console.log('----------agregado exitosamente-------------');
      })
  })
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
        value: message.value.toString(),
      })

      if(!countLoginUsers[message.value.toString()]) {
        countLoginUsers[message.value.toString()] = {
          time: timestapm.push(DateTime.now()),
          count: 1
        }
      } 
      else {
        countLoginUsers[message.value.toString()].count += 1;
        countLoginUsers[message.value.toString()].time = timestapm.push(DateTime.now());        
               
        if(countLoginUsers[message.value.toString()].count >= 5 ) {
          const initTime = timestapm[countLoginUsers[message.value.toString()].count - 5];
          const finalTime = timestapm[countLoginUsers[message.value.toString()].count - 1];
          if (timeInterval(initTime, finalTime ) <= 60) {
            console.log('BAAAAAAAAAN');

            const params = message.value.toString();
            writeJson(params);
          }
          console.log(timeInterval(timeInterval(initTime, finalTime )));
        }
      }
      console.log(countLoginUsers);
    },
  })
  res.send("Hello World blocked!");
});


app.listen(port, () => {
  console.log(`API RUN AT http://localhost:${port}`);
});
