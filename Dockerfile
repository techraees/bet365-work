FROM node:16.14.0

RUN npm install -g npm@8.5.5

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

EXPOSE 8082

RUN npm run build

CMD ["npm", "run", "dev"]
