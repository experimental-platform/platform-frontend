FROM experimentalplatform/ubuntu:latest

RUN curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get update && \
    apt-get install -y build-essential curl nodejs git systemd-services && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY management-proxy/session-manager /app
WORKDIR /app
RUN npm install

WORKDIR /
ADD frontend /build
WORKDIR /build
RUN npm install -g bower
RUN bower --allow-root install && mv * /app/public/

WORKDIR /app
EXPOSE 3000
ENV NODE_ENV production
CMD node bin/www
