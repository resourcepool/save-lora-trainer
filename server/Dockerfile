FROM node:slim
WORKDIR /server

COPY ./package.json /server/
COPY ./package-lock.json /server/
COPY ./jest.config.js /server/
COPY ./tsconfig.json /server/
COPY ./src /server/src

RUN npm install

ENV NODE_ENV=production

EXPOSE 3333
CMD [ "npm", "start"]
