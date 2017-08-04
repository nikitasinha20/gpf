"use strict";
/* tslint:disable */
require('reflect-metadata');
const http = require("http");
const express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const config = require('./config');
const securityConfig = require('nodedata/security-config');
const exports_1 = require('nodedata/core/exports');
const data = require('nodedata/mongoose');
//---------sequelize setting-----------------------------
const seqData = require("nodedata/sequelizeimp");
var Main = require('nodedata/core');
Main(config, securityConfig, __dirname, data.entityServiceInst, seqData.sequelizeService);
//var Main = require('./core')(config, securityConfig, __dirname, data.entityServiceInst, seqData.sequelizeService);
data.connect();
data.generateSchema();
seqData.sequelizeService.connect();
seqData.generateSchema();
var app = express();
Main.register(app);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
var expressSession = require('express-session');
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", exports_1.router);
var server = http.createServer(app);
var port = process.env.PORT || 9999;
server.listen(port);
//# sourceMappingURL=server.js.map