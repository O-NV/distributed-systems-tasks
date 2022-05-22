## Distributed systems 

Members:
- Oscar Castro
- Valeria Navarrete

## Task 1: Cache and RPC

The objective of this assignment is to put into practice the concepts of Cache and RPC seen in class. To do so, we will make use of technologies that allow us to solve the problem.

For this, a client and a server have been created, both connected through gRPC, where the gRPC client is a REST api that connects to Redis to manage the api cache. Analogously the gRPC server connects to the database if the requested query is not found in the cache


### Instructions for code execution:
```bash
git clone https://github.com/O-NV/distributed-systems-tasks.git
cd distributed-systems-tasks
cd task1
sudo docker-compose up
```

### Note:
The execution of the code may have problems because of the ports that are running on your computer, for verification of these you can run the command:
```bash
sudo lsof -nP -iTCP -sTCP:LISTEN
```
and if you need to stop them run in your console: 
```bash
sudo kill -9 PID
```

### Run the application
Open [http://localhost:3000/inventory/search](http://localhost:3000/inventory/search) to view it in your browser, this will display all the information available in the database. To start a search you must open [http://localhost:3000/inventory/search?q=SEARCH](http://localhost:3000/inventory/search?q=SEARCH). Where SEARCH is the parameter that you want to search for.

### Cache verification
To check the insertion of data in the cache you can check it by opening [http://localhost:8081](http://localhost:8081) . This opens the Redis database where the requests made in the search engine are stored.

### Cache configuration
The configuration applied in Redis is:

- Cache memory: this is done using the command ```maxmemory 100mb```
- Removal algorithm: for this purpose the following command is used ```maxmemory-policy allkeys-lru```

You can see how the parameters were set in the file "docker-compose.yaml". 

### LRU vs LFU

LRU  | LFU
------------- | -------------
The LRU cache data removal policy prioritizes short-term hits by discarding assets that have been used the least in a certain period of time. It sorts them by their number of uses. It uses the time each cached item has been in cache for its removal. | The LFU cache data removal policy prioritizes long term hits by discarding from the cache the assets that will be used the least later. For this it needs to know how many hits each cached data has had.

### Removal method justification

LRU was chosen because, being a search engine, it is necessary to keep in cache the most requested queries in the short term and remove those that are not being requested.

### Images dockers used
- Redis:[https://hub.docker.com/r/bitnami/redis/](https://hub.docker.com/r/bitnami/redis/)
- Redis-commander: [https://hub.docker.com/r/rediscommander/redis-commander](https://hub.docker.com/r/rediscommander/redis-commander)
- Postgresql: [https://hub.docker.com/r/bitnami/postgresql/](https://hub.docker.com/r/bitnami/postgresql/)
- Node: [https://hub.docker.com/_/node](https://hub.docker.com/_/node)
