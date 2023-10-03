FROM node:18-alpine As backend-build

WORKDIR /usr/src/backend

COPY ./backend/package*.json ./

RUN npm ci
COPY ./backend .

WORKDIR /usr/src/shared
COPY ./shared/package*.json ./
RUN npm ci
COPY ./shared ./

WORKDIR /usr/src/backend


