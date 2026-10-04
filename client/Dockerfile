FROM node:24.12.0

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]
