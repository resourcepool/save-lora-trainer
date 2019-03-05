FROM node:slim

WORKDIR /server

COPY ./package.json /server/
COPY ./package-lock.json /server/
COPY ./jest.config.js /server/
COPY ./tsconfig.json /server/
COPY ./src /server/src

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
