FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["node", "dist/index.js"]
