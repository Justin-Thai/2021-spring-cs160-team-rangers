FROM postgres:13.2-alpine

FROM node:14.16.0-alpine3.10 as builder

WORKDIR /app/server-build
COPY package.json /app/server-build/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --silent
COPY . /app/server-build
RUN npm run build

FROM node:14.16.0-alpine3.10
WORKDIR /app/server
COPY --from=builder /app/server-build/build /app/server/build
COPY package.json /app/server/package.json
COPY .env /app/server
COPY pg.env /app/server
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --only=prod --silent

EXPOSE 5000
CMD ["npm", "start"]
