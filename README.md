## Distributed systems 

Intengrantes:
- Oscar Castro
- Valeria Navarrete

## Task 1: Cache and RPC

The objective of this assignment is to put into practice the concepts of Cache and RPC seen in class. To do so, the student will have to make use of technologies that will allow him/her to solve the problem posed.

For this, a client and a server were created, both connected through gRPC, where the gRPC client is a REST api that connects to Redis to manage the api cache and the gRPC-server connects to the database if the requested query is not found in cache.

The configuration applied in redis is:

- maxmemory 100mb
- maxmemory-policy allkeys-lru

You can see how the parameters were set in the file "docker-compose.yaml". 

### Instructions for code execution:
```bash
git clone https://github.com/O-NV/distributed-systems-tasks.git
cd distributed-systems-tasks
sudo docker-compose up
```

### Note:
The execution of the code may have problems because of the ports that are running on your computer, for verification of these you can run the command:
```bash
sudo lsof -nP -iTCP -sTCP:LISTEN
```
and if you need to stop them run in your console: ```bash sudo kill -9 ID_CONTAINER```

### Run the application
Open [http://localhost:3000/inventory/search](http://localhost:3000/inventory/search) to view it in your browser, this will display all the information available in the database. To start a search you must open [http://localhost:3000/inventory/search?q=SEARCH](http://localhost:3000/inventory/search?q=SEARCH). Where SEARCH is the parameter that you want to search for.
