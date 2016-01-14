FROM iojs:1.8.4


ARG port=3000
ENV EPHEMBOT_PORT=$port
ARG token
ENV SLACK_TOKEN=$token
RUN echo $SLACK_TOKEN

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

# Expose the ports that your app uses. For example:
EXPOSE $EPHEMBOT_PORT

CMD [ "npm", "start" ]
