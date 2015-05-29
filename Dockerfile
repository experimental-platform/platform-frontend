FROM dockerregistry.protorz.net/session-manager:latest

ADD . /build
WORKDIR /build
RUN npm install -g bower
RUN bower --allow-root install && mv * /app/public/
