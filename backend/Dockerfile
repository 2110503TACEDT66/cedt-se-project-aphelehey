FROM node:20.11.1

WORKDIR /app

ADD package*.json ./

RUN npm install --production

ADD . .

CMD ["npm", "start"]