FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

RUN yarn run build

CMD [ "yarn", "run", "start" ]