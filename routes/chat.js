var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = require('../models/Chat');

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