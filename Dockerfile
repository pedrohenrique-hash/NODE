FROM node:6.5.0

WORKDIR /app

RUN npm install nodemon -g
RUN npm install
RUN npm install mysql
RUN npm install express
RUN npm install body-parser --save
COPY index.js /app/index.js
COPY package.json /app/package.json

EXPOSE 3000                                     