const chatsService = require('../Services/chatsService');

exports.add = (req, res) => {
    chatsService.add(req.body, (err, chats) => {
        if (err) {
            res.status(401).send(err);
        } else if (!chats) {
            res.status(401).json({message: ' already exists!'})
        } else {
            res.status(200).send(chats);
        }
    });
};


exports.getAll = (req, res) => {
    chatsService.getAll((err, chats) => {
        if (err) {
            res.status(401).send(err);
        }else if (!chats) {
            res.status(404).send({message: 'No Item is found!'});
        }else {
            res.status(200).send(chats);
        }
    })
};


exports.getNameList = (req, res) => {
    chatsService.getNameList((err, chats) => {
        if (err) {
            res.status(401).send(err);
        }else if (!chats) {
            res.status(404).send({message: 'No Item is found!'});
        }else {
            res.status(200).send(chats);
        }
    })
};
