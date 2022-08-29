FROM geoffreybooth/meteor-base:2.7.3

ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost:3000"
ENV NODE_TLS_REJECST_UNAUTHORIZED=0
ENV METEOR_ALLOW_SUPERUSER=1

WORKDIR /app
COPY package*.json ./

RUN meteor npm install 

EXPOSE 3000

CMD [ "meteor", "npm", "start" ]