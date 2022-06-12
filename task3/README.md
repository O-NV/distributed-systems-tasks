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

### Run the application



### Questions to answer:
1. Explain the architecture that Cassandra handles. When the cluster is created, how are the nodes connected? What happens when a client makes a request to one of the nodes? What happens when one of the nodes disconnects? Is the network generated between the nodes always efficient? Is there load balancing?

2. Cassandra has mainly two strategies to maintain redundancy in data replication. Which are these? What is the advantage of one over the other? Which one would you use for the current case and why? Justify.

3. Taking into account the context of the problem, do you believe that the proposed solution is the right one? What happens when you want to scale the solution? What improvements would you implement? Orient your answer towards Sharding (data replication/distribution) and comment on a strategy you could follow to sort the data.


### Images dockers used
- Node: [https://hub.docker.com/_/node](https://hub.docker.com/_/node)
