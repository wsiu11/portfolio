const contact = require('../models/contact');

// it is the middleware for checking if user is logged in.
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = function (app) {
    // it is the business contact page. it queries all the contact and passes them to ejs for rendering.
    app.get('/secure', loggedIn, function (req, res) {
        contact.find().sort({ name: 1 }).then((contactList) => {
            if (!contactList) {
                res.render('index', { title: "Secure area", contacts: null });
            }
            else {
                res.render('index', { title: "Secure area", contacts: contactList });
            }
        });
    });
    // it is the handler for rendering the update page view for specific contact.
    app.get('/updateContact-:id', loggedIn, function (req, res) {
        contact.find({ _id: req.params.id }).then((contactList) => {
            if (!contactList) {
                res.redirect('/secure');
            } else {
                console.log(contactList);
                res.render('index', { title: "Update contact", contacts: contactList });
            }
        }).catch(function (err) {
            console.log(err);
            res.redirect('../secure');
        });
    });
    // it is the update handler for updating the contact.
    app.post('/contact/update/:id', loggedIn, function (req, res) {
        contact.findOneAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name, contactNumber: req.body.contact, email: req.body.email } }).then((c) => {
            res.redirect('/secure');
        }).catch(function (err) {
            console.log(err);
            res.redirect('/secure');
        });
    });
    // it is the delete handler for deleting the contact.
    app.post('/contact/delete/:id', loggedIn, function (req, res) {
        contact.deleteOne({ _id: req.params.id }).then((c) => {
            res.redirect('/secure');
        }).catch(function (err) {
            console.log(err);
            res.redirect('/secure');
        });
    });
};
