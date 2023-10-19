let mongoose = require('mongoose');

// create a model class

let UserModel = mongoose.Schema({
    username: String,
    password: String,
    email: String
}, {
    collection: 'User'
});
module.exports = mongoose.model('User', UserModel);