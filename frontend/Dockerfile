FROM node:alpine

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN npm install

CMD [ "npm", "start" ]
