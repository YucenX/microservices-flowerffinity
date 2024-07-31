FROM node:20.14.0
# i just copied from the video-streaming docker file, even though on David's Github the commands are slightly different...
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY ./src ./src 

CMD npm start 