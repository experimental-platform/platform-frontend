FROM dockerregistry.protorz.net/ubuntu:latest


RUN curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get update && \
    apt-get install -y build-essential curl nodejs git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY session-manager /app
WORKDIR /app
RUN npm install

EXPOSE 3000
CMD node bin/www
