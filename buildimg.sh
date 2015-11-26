#!/usr/bin/env bash

set -eu

# e.g. 'platform-dokku'
REPONAME=$(echo $TRAVIS_REPO_SLUG | cut -f2 -d '/')
# e.g. 'dokku'
SERVICENAME=$(echo $REPONAME | sed 's/^platform-//')

docker build -t experimentalplatform/$SERVICENAME:$TRAVIS_BRANCH .

if [ "${TRAVIS_BRANCH}" == "master" ]; then
  echo -e "\n\nWe're not uploading master anywhere."
else
  docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS
  docker push experimentalplatform/$SERVICENAME:$TRAVIS_BRANCH
  if [ "$TRAVIS_BRANCH" != "development" ]; then
    BODY="{ \"request\": {
      \"message\": \"Triggered by '$TRAVIS_REPO_SLUG'\",
        \"config\": {
        \"env\": {
          \"SERVICE_TAG\": \"$TRAVIS_BRANCH\",
          \"SERVICE_NAME\": \"$SERVICENAME\"
    }}}}"
    URL="https://api.travis-ci.org/repo/experimental-platform%2Fplatform-configure/requests"
    echo "URL: $URL"
    echo "BODY: $BODY"
    curl -f -s -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -H "Travis-API-Version: 3" \
      -H "Authorization: token $TRAVIS_TOKEN" \
      -d "$BODY" \
      $URL
  fi
fi
