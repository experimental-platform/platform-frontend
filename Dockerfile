FROM experimentalplatform/ubuntu:latest

RUN curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get update && \
    apt-get install -y build-essential curl nodejs npm git systemd-services && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g bower

COPY management-proxy/session-manager /app
RUN cd /app && npm install

COPY frontend /app/public
RUN cd /app/public && bower --allow-root install

WORKDIR /app
EXPOSE 3000
ENV NODE_ENV production
CMD ["dumb-init", "node", "bin/www"]
