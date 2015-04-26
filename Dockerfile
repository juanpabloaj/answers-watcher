FROM node:0.10.38

ADD . /app
WORKDIR /app

RUN npm install

CMD ["node", "server.js"]
