FROM node:8.1.0-alpine

RUN     adduser -D container
RUN     mkdir -p /home/container/app/dist
WORKDIR /home/container/app
COPY    package.json yarn.lock .babelrc ./
RUN     chown container yarn.lock && yarn install
CMD     [ "npm", "run", "start:dev" ]