const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const cors = require('cors');
const bodyParser = require('body-parser');
const grpc = require("./grpc_client");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,   
    port: 6379
});

redisClient.on("error", function(error) {
    console.error(error);
});
  
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000
    }
}));

app.get("/inventory/search", async (req, res) => {
  const name =  req.query.q? req.query.q: '';

console.log(name);
    await redisClient.get(!name?'all':name, (error, data) => {
        // console.log(data);
        if (error) {
            console.log(error);
        }

        if(data === null) {
            grpc.GetItem ({ name: name }, async(error, data) => {
                if (error){
                   console.log(error);
                   res.json({});
                } res.json(data);
            
                const save = await redisClient.set(!name?'all':name, JSON.stringify(data));
                // console.log(save);
              });
              
              console.log('no cache');
        } else {
            console.log('si cache');
            res.json(JSON.parse(data));
        }
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
