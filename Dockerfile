FROM dockerregistry.protorz.net/session-manager:latest

ADD . /build
WORKDIR /build
RUN npm install -g bower
RUN bower --allow-root install

# TODO: ADD BUILD PUBLIC FOLDER, REMOVE BUILD STUFF ELSE