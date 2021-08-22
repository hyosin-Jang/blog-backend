FROM node:14.17.3

RUN npm install

COPY package*.json / 

WORKDIR /blog-backend

EXPOSE 4000

CMD ["node", "server.js"]
