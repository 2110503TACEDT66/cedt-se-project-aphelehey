FROM node:20.11.1

WORKDIR /app

ADD package*.json ./

RUN npm install --production

ADD . .

#RUN npm run build

CMD ["npm", "run","dev"]