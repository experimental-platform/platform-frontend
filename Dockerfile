<<<<<<< HEAD
FROM dockerregistry.protorz.net/ubuntu:latest
=======
FROM experimentalplatform/management-proxy:latest
>>>>>>> 09f2b48d44808dbd2db5deb080452d72dae70486

RUN curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get update && \
    apt-get install -y build-essential curl nodejs git systemd-services && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ADD frontend /build
WORKDIR /build
RUN npm install -g bower
RUN bower --allow-root install && mv * /app/public/

COPY management-proxy/session-manager /app
WORKDIR /app
RUN npm install
EXPOSE 3000
ENV NODE_ENV production
CMD node bin/www
