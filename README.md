## Distributed systems 

This repository is intended to show the development of the tasks of Sistemas Distruidos during the first half of 2022.
Inside each folder you can find the instructions for the code execution and additional information.

Members:
- Oscar Castro
- Valeria Navarrete

## Task 1: Cache and RPC

The objective of this assignment is to put into practice the concepts of Cache and RPC seen in class. To do so, we will make use of technologies that allow us to solve the problem.

For this, a client and a server have been created, both connected through gRPC, where the gRPC client is a REST api that connects to Redis to manage the api cache. Analogously the gRPC server connects to the database if the requested query is not found in the cache

## Task 2: Kafka

The objective of the task is to understand the main features of Kafka and implement an authentication service and a security service against malicious activity communicated through a broker.

To do so, two REST APIs were implemented that communicate through a Kafka channel, where the first one will have a route that receives a POST with the login data and the other one with a GET that sends the banned users.

## Task 3: Cassandra
Task 3 aims to understand the main functionalities and features of Cassandra. 

For this, configurations will be made to build a cluster and to program a REST API with CRUD operations.
