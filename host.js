/**
 * date: 2017-03-06 21:42:02
 * author: AllocatorXy
 * description: node.js
 */
'use strict';

const exp = require('express');
const st = require('express-static');
const mysql = require('mysql');
const sv = exp();

// init
sv.listen(80);
sv.use(st('_site'));
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '298319',
    database: 'renrenche'
});

/**
 * get: topNav
 * @param  {interface} '/getNav'
 */
sv.get('/getNav', (req, res) => {
    db.query('SELECT * FROM top_nav', (err, data) => {
        if (!err) {
            res.send({ err: 0, data });
            res.end();
        } else {
            res.send({ err: 1, msg: 'data error' });
            res.end();
        }
    });
});

/**
 * get: banner
 * @param  {interface} '/getBanner'
 */
sv.get('/getBanner', (req, res) => {
    db.query('SELECT * FROM banner', (err, data) => {
        if (!err) {
            res.send({ err: 0, data });
            res.end();
        } else {
            res.send({ err: 1, msg: 'data error' });
            res.end();
        }
    });
});

/**
 * get: con-list
 * @param  {interface} '/getConList'
 */
sv.get('/getcontent', (req, res) => {
    db.query('SELECT * FROM content', (err, data) => {
        if (!err) {
            res.send({ err: 0, data });
            res.end();
        } else {
            res.send({ err: 1, msg: 'data error' });
            res.end();
        }
    });
});

/**
 * get: test
 * @param  {interface} '/getTest'
 */
sv.get('/getTest', (req, res) => {
    db.query('SELECT * FROM test', (err, data) => {
        if (!err) {
            res.send({ err: 0, data });
            res.end();
        } else {
            res.send({ err: 1, msg: 'data error' });
            res.end();
        }
    });
});
