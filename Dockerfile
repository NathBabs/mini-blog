FROM node:18-alpine3.17 AS builder

WORKDIR /app

RUN apk add --update openssl

# remove build folder if it exists
RUN rm -rf /dist

# copy package.json and package-lock.json to workdir
COPY package*.json ./

COPY ./prisma prisma

# COPY .env .env

# install dependencies
RUN npm install

# copy remaining files
COPY . .

# run prisma migrations
RUN npx prisma generate

RUN npx tsc

FROM node:18-alpine3.17 AS server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/.env ./

EXPOSE 80

CMD ["npm", "run", "start:prod"]