## Distributed systems 

Members:
- Oscar Castro
- Valeria Navarrete

## Task 2: Kafka

The objective of the task is to understand the main features of Kafka and implement an authentication service and a security service against malicious activity communicated through a broker.

To do so, two REST APIs were implemented that communicate through a Kafka channel, where the first one will have a route that receives a POST with the login data and the other one with a GET that sends the banned users.

### Instructions for code execution:
```bash
git clone https://github.com/O-NV/distributed-systems-tasks.git
cd distributed-systems-tasks
cd task2
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
Send a post request with a json containing the login data (username and password) to the path http://localhost:3000/login to be able to log in, if you send more than 5 times this request you will be banned and you can check it if you enter the path http://localhost:5000/blocked where all banned users are found so far.

### Note:
It is recommended to use postman for the request of type post where in the body is filled with a message of type json as the following example: 
```
{
    "user": "nicolas.hidalgoc@mail.udp.cl",
    "pass": "sistemasdistribuidosbestramo"
}
```
### Questions:

Why does Kafka work well in this scenario?
  
Kafka has a lot of potential for this type of scenarios because it is a secure bridge to send the information and also because it can become a very stable and scalable system due to its characteristics where if necessary the number of brokers could be increased to avoid data bottlenecks.

Based on the technologies you have at your disposal (Kafka, backend) what would you do to handle a large amount of users at the same time?


  
### Images dockers used
- Node: [https://hub.docker.com/_/node](https://hub.docker.com/_/node)
- Kafka: [https://hub.docker.com/r/bitnami/kafka/](https://hub.docker.com/r/bitnami/kafka/)
- Zookeeper: [https://hub.docker.com/r/bitnami/zookeeper](https://hub.docker.com/r/bitnami/zookeeper)
