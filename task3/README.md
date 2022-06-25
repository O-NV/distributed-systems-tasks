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

Cassandra uses the peer-to-peer model to distribute data to be managed. To distribute them, tokens are used, each node is assigned a different one, and in this way the node where the information must be stored is known. Therefore, Cassandra balances the load.

In Cassandra all nodes are equal, so any of the nodes could have the role of coordinator, and these are connected in a ring. The nodes communicate to perform the necessary operations to keep themselves updated and to keep the cluster active.

In the event that a client makes a request to one of the nodes, it must choose which node will resolve the query. This choice is made by the coordinator. As mentioned above, all nodes can hold this position, and the node that receives the request becomes the coordinator momentarily. 

When a node disconnects, the tokens assigned to each node present are redistributed. Therefore, the information is also redistributed. The data held by the disconnected node is not lost, since the data is replicated to other nodes. Also the nodes that are still present are responsible for notifying that a node was disconnected.

The network generated between Cassandra nodes will not always be efficient, since it will depend on the use it is given. The network form is very effective if you need to manage and store a large amount of data in several server sources. However, if you want to use it in a context where a large number of nodes are inserted frequently, it would not be very efficient, since several resources are used to enter a new node and this may take longer than expected.


2. Cassandra has mainly two strategies to maintain redundancy in data replication. Which are these? What is the advantage of one over the other? Which one would you use for the current case and why? Justify.

The strategies that Cassandra uses to maintain redundancy in data replication are SimpleStrategy, which consist of placing the first replica in a node determined by the partitioner and the following replicas in the following nodes clockwise in the ring without taking into account the topology and NetworkTopologyStrategy, like the previous strategy the replicas are placed clockwise with the difference that in this strategy more data centers are needed.

The advantage that NetworkTopologyStrategy has over SimpleStrategy is that the former can work with more data centers.

In this case we would use SimpleStrategy because it is simpler and more appropriate to our system because we do not need more than one data center to carry it out unless we need to scale the system.

3. Taking into account the context of the problem, do you believe that the proposed solution is the right one? What happens when you want to scale the solution? What improvements would you implement? Orient your answer towards Sharding (data replication/distribution) and comment on a strategy you could follow to sort the data.

Yes because it is an efficient solution, in addition to being scalable if required, that fully complies with the request. What happens when you want to scale the system is to increase the number of nodes to better distribute the load among all nodes and also adjust the number of replications needed for each table.

To improve this system what we would implement would be a greater number of nodes in the cluster, in addition to increasing the replication factor to make it more difficult to lose the information acquired from the recipes and users.

### Images dockers used
- Node: [https://hub.docker.com/_/node](https://hub.docker.com/_/node)
- Cassandra: [https://hub.docker.com/r/bitnami/cassandra](https://hub.docker.com/r/bitnami/cassandra)
