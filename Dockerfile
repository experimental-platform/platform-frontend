FROM dockerregistry.protorz.net/session-manager:latest

ADD . /build
WORKDIR /build
RUN npm install -g bower
RUN bower install

# TODO: ADD BUILD PUBLIC FOLDER, REMOVE BUILD STUFF ELSE