FROM node:16.6.1-alpine3.14

WORKDIR /home/node

COPY . .

RUN chown -R 777 blocked.json
RUN npm install

CMD [ "npm", "start" ]