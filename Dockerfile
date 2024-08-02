FROM node:20

WORKDIR /app

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "node_modules/.bin/next", "dev"]
