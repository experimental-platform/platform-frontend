FROM experimentalplatform/management-proxy:latest

ADD . /build
WORKDIR /build
RUN npm install -g bower
RUN bower --allow-root install && mv * /app/public/
WORKDIR /app
