const chat = require('../Models/chat');


exports.add = (chatBody, callback) => {

    const newchat = new chat({
        name: chatBody.name,
        updated_at: new Date(),
        message : chatBody.message,
        talkto : chatBody.talkto
    });

    newchat.save((err) => {
        if (err) {
            return callback(err);
        }
        return callback(null, newchat);
    });
};

exports.getAll = (callback) => {
    chat.find({}, (err, chats) => {
        if (err) {
            return callback(err);
        } else if (!chats) {
            return callback(null, null);
        } else {
            return callback(null, chats);
        }
    })
}

exports.getNameList = (callback) => {
    // chat.find({},{name:1, _id:0}, (err, chats) => {
    chat.distinct(("name"), (err, chats) => {
        if (err) {
            return callback(err);
        } else if (!chats) {
            return callback(null, null);
        } else {
            return callback(null, chats);
        }
    })
}
