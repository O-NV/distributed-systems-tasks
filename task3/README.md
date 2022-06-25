## Distributed systems 

Members:
- Oscar Castro
- Valeria Navarrete

## Task 3: Cassandra
Task 3 aims to understand the main functionalities and features of Cassandra by performing configurations to build a cluster and to program a REST API with CRUD operations.

For this purpose, a drug sales system is created with 3 Cassandra nodes in which you can create prescription, edit prescription and delete prescription in the database. 

### Instructions for code execution:
```bash
git clone https://github.com/O-NV/distributed-systems-tasks.git
cd distributed-systems-tasks
cd task3
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
To use the application you must start by sending a mail request with a json containing the access data (customer data and recipe) to the route http://localhost:3000/create to create the customer and the recipe, if the customer is already created only the recipe will be created, you can also edit any recipe from the route http://localhost:3000/edit sending a json with the new information or you can delete it from the route http://localhost:3000/delete sending a json with the id of the recipe.

### Note:
It is recommended to use postman for post type requests where the body is filled with a json type message like the following examples:

Example of creation (user and recipe):
```
{
 "nombre": "Melon",
 "apellido": "Musk",
 "rut": "1",
 "email": "Xmelon_muskX@fruitter.com",
 "fecha_nacimiento": "28/06/1971",
 "comentario": "Amigdalitis",
 "farmacos": "Paracetamol",
 "doctor": "El Waton de la Fruta"
}
```
Example of recipe editing:
```
{
 "id": 1,
 "comentario": "Amigdalitis aguda",
 "farmacos": "Paracetamol con aguita",
 "doctor": "El Waton de la Fruta"
}
```
Example of recipe elimination:
```
{
 "id": 1
}
```

### Questions to answer:
1. Explain the architecture that Cassandra handles. When the cluster is created, how are the nodes connected? What happens when a client makes a request to one of the nodes? What happens when one of the nodes disconnects? Is the network generated between the nodes always efficient? Is there load balancing?

2. Cassandra has mainly two strategies to maintain redundancy in data replication. Which are these? What is the advantage of one over the other? Which one would you use for the current case and why? Justify.

3. Taking into account the context of the problem, do you believe that the proposed solution is the right one? What happens when you want to scale the solution? What improvements would you implement? Orient your answer towards Sharding (data replication/distribution) and comment on a strategy you could follow to sort the data.


### Images dockers used
- Node: [https://hub.docker.com/_/node](https://hub.docker.com/_/node)
