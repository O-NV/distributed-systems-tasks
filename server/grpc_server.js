const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./example.proto";
const { Pool } = require('pg');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST,
  user: 'uwu',
  password: '123',
  database: 'tiendita',
  port: '5432'
});

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const itemProto = grpc.loadPackageDefinition(packageDefinition);

const server = () => {
  const server = new grpc.Server();
  
  server.addService(itemProto.ItemService.service, {
    getItem: async(_, callback) => {
      const itemName = _.request.name;
      const item = await pool.query('SELECT * FROM items WHERE items.name ~* $1', [itemName]);
      console.log(item.rows);
      callback(null, { items: item.rows });
    }
  });

  server.bindAsync(process.env.SERVER_HOST+":50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) console.log(err);
    else {
      console.log("GRPC SERVER RUN AT http://localhost:50051");
      server.start();
    }
  });
};

// exports.server = server;

server();
