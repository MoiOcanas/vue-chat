var moongose = require('mongoose'), Schema = moongose.Schema;

var RoomSchema = new moongose.Schema({
    room_name: String,
    created_date: { type: Date, default: Date.now },
});

module.exports = moongose.model('Room', RoomSchema);