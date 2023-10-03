FROM node:18-alpine As frontend-build

WORKDIR /usr/src/frontend
COPY ./frontend/package*.json ./
RUN npm ci
COPY ./frontend .


