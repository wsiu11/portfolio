let mongoose = require('mongoose');

// create a model class

let ContactModel = mongoose.Schema({
    name: String,
    contactNumber: String,
    email: String
}, {
    collection: 'Contact'
});
module.exports = mongoose.model('Contact', ContactModel);