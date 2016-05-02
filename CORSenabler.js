'use strict';

import request from 'request'
import express from 'express'
import basicAuth from 'basic-auth'

let app = express();
const dimeServerUrl = 'localhost:8080'
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    next();
});

app.get('*', function(req, res) {
    let username = basicAuth(req).name
    let password = basicAuth(req).pass
    let url = `http://${username}:${password}@${dimeServerUrl}${req.originalUrl}`
    req.pipe(request(url), {end: true}).pipe(res, {end: true});
});

app.post('*', function(req, res) {
    let username = basicAuth(req).name
    let password = basicAuth(req).pass
    let url = `http://${username}:${password}@${dimeServerUrl}${req.originalUrl}`
    let r = request.post({uri: url, json: req.body, headers: req.headers});
    req.pipe(r).pipe(res)
});

app.listen(process.env.PORT || 3000);