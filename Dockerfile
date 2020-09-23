FROM node:latest

WORKDIR /app

COPY . .

RUN npm install && cd frontend && yarn && yarn build

EXPOSE 5000

CMD [ "npm", "start" ]