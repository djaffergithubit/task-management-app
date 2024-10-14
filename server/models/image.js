const mongoose = require('mongoose');

const UserImageSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    image: {
        type: String
    }
});

exports.UserImage = mongoose.model('UserImage', UserImageSchema);
