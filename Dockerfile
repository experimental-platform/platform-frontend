FROM dockerregistry.protorz.net/ubuntu:latest

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:chris-lea/node.js && \
    apt-get update && \
    apt-get install -y build-essential curl nodejs git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY session-manager /app
WORKDIR /app
RUN npm install

EXPOSE 3000
CMD node bin/www
