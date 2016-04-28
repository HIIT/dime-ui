'use strict';

import request from 'request'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import basicAuth from 'basic-auth'
var app = express();

//app.use(bodyParser.json()); // for parsing application/json
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    next();
});

app.get('*', function(req, res) {
    transferRequestToDime(req).then(
        (val) => {
            res.send(val)
        }
    )
});

function transferRequestToDime (req) {
    let username = basicAuth(req).name
    let password = basicAuth(req).pass
    let url = `http://${username}:${password}@127.0.0.1:8080${req.originalUrl}`
    return new Promise ( (resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error) {
                resolve(body);
            } else {
                console.error(error)
                console.log(req.originalUrl)
                console.error("CORSenabler has no connection with DeMi on localhost:8080")
            }
        })
    })
}

var server = http.createServer(app);
server.listen(3000, 'localhost')
server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    console.log(`CORSEnabler server on ip: ${addr.address} on port: ${addr.port}`);
}