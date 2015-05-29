FROM dockerregistry.protorz.net/session-manager:latest

ADD . /build
WORKDIR /build
RUN npm install
RUN grunt

# TODO: ADD BUILD PUBLIC FOLDER, REMOVE BUILD STUFF ELSE