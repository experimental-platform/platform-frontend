angular.module("protonet.platform")
  .factory("AppTutorial", function() {

    var appTutorials = {
      "node.js": {
        setup: [{
          label: "Get the node.js \"hello world\" example:",
          code: [
            "git clone https://github.com/heroku/node-js-sample.git",
            "cd node-js-sample"
          ]
        }, {
          label: "Set a name and add git remote:",
          code: [
            "APP_NAME=my-app-name",
            "git remote add platform ssh://dokku@{{host}}:8022/$APP_NAME"
          ]
        }],
        deploy: [{
          label: "Deploy the app on this server:",
          code: ["git push platform master"]
        }]
      },

      "python": {
        setup: [{
          label: "Get the Python \"hello world\" example:",
          code: [
            "git clone https://github.com/guaq/heroku-in-a-bottle.git python-sample",
            "cd python-sample"
          ]
        }, {
          label: "Set a name and add git remote:",
          code: [
            "APP_NAME=my-app-name",
            "git remote add platform ssh://dokku@{{host}}:8022/$APP_NAME"
          ]
        }],
        deploy: [{
          label: "Deploy the app on this server:",
          code: ["git push platform master"]
        }]
      },

      "php": {
        setup: [{
          label: "Get the PHP \"hello world\" example:",
          code: [
            "git clone https://github.com/heroku/php-getting-started.git",
            "cd php-getting-started"
          ]
        }, {
          label: "Set a name and add git remote:",
          code: [
            "APP_NAME=my-app-name",
            "git remote add platform ssh://dokku@{{host}}:8022/$APP_NAME"
          ]
        }],
        deploy: [{
          label: "Deploy the app on this server:",
          code: ["git push platform master"]
        }]
      },

      "rails": {
        setup: [{
          label: "Get the Rails \"hello world\" example:",
          code: [
            "git clone git@github.com:experimental-platform/rails-hello-world.git",
            "cd rails-hello-world"
          ]
        }, {
          label: "Set a name and add git remote:",
          code: [
            "APP_NAME=my-app-name",
            "git remote add platform ssh://dokku@{{host}}:8022/$APP_NAME"
          ]
        }],
        deploy: [{
          label: "Deploy the app on this server:",
          code: ["git push platform master"]
        }]
      },

      "docker": {
        setup: [{
          label: "Create a Dockerfile:",
          code: [
            "mkdir my-docker-app",
            "cd my-docker-app",
            "echo \"echo hello world\" > helloworld.sh",
            "touch Dockerfile"
          ]
        }, {
          label: "Then open the Dockerfile and add instructions:",
          code: [
            "FROM experimentalplatform/ubuntu:latest",
            "ADD /helloworld.sh /helloworld.sh",
            "CMD sh helloworld.sh"
          ]
        }, {
          label: "Set a name and add git remote:",
          code: [
            "APP_NAME=my-app-name",
            "git remote add  ssh://dokku@{{host}}:8022/$APP_NAME"
          ]
        }],
        deploy: [{
          label: "Deploy the app on this server:",
          code: ["git push platform master"]
        }]
      }
    };

    return {
      get: function(appType) {
        return appTutorials[appType.toLowerCase()];
      }
    };

  });