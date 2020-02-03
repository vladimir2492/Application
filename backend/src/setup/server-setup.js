const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
    PORT = 3000,
        SESS_LIFETIME = TWO_HOURS,
        NODE_ENV = 'development',
        SESS_NAME = 'sid',
        SESS_SECRET = 'ssh!quiet,it\'asecret!'
} = process.env

module.exports = function(app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", 'http://localhost:8081');
        res.header("Access-Control-Allow-Credentials", 'true');
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie, "
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
      });
    app.use(bodyParser.json());
    //app.use(cors());
    app.use(express.static('public'));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: SESS_SECRET,
        name: SESS_NAME,
        cookie: {
            maxAge: SESS_LIFETIME,
            sameSite: false,
            secure: false
        }
    }))
}

module.exports.SESS_NAME = SESS_NAME;
module.exports.SESS_SECRET = SESS_SECRET;