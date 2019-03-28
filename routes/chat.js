var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = require('../models/Chat');


//Server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(4000);

io.on('connection', function(socket) {
    console.log('User connected');
    socket.io('disconnect', function() {
        console.log('User disconnected');
    });
    socket.io('save-message', function(data) {
        console.log(data);
        io.emit('new-message', { message: data });
    });
})

//Get all rooms
router.get('/', function (req, res, next) {
    Chat.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

//Get a single room by id
router.get('/:id', function (req, res, next) {
    Chat.findById(req.params.id, function (err, post) {
        if (err) return next(err);
    });
});

//Save room
router.post('/', function (req, res, next) {
    Chat.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

//Update room
router.put('/:id', function (req, res, next) {
    Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

//Delete room
router.delete('/:id', function (req, res, next) {
    Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;