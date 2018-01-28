Sysive
======

Syslog Archive

Written in Node.js and MongoDB for storage



Setup:
Clone the Repo

    git clone https://github.com/robertjuric/Sysive

Install dependencies

    cd Sysive   
    npm install

Create MongoDB data directory
    
    mkdir data

Start MongoDB

    mongod --dbpath=./data --port 27017

Start Sysive

    sudo node app.js

View the Logs, Open a Browser and Enter:

    http://localhost:3000/messages