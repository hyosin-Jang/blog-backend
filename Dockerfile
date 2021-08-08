FROM node:14.17.3

RUN npm install -g http-server

WORKDIR /the/workdir/path

CMD ['http-server', '-p', '4000', './public']