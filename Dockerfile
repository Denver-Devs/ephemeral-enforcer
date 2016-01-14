FROM iojs:1.8.4
MAINTAINER Zachary Green <zachjamesgreen@gmail.com>
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

# Expose the ports that your app uses. For example:

CMD [ "npm", "start" ]
