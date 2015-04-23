# AAL #


## Setup Guide ##

    sudo npm install -g bower
    bower install

## Local development ##

Compile SCSS to CSS

    sass --watch scss/index.scss:css/index.css

Start server:

    python -m SimpleHTTPServer 8008
    open http://localhost:8008