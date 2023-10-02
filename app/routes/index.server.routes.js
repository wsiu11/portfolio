module.exports = function (app) {
    app.get('/', function (req, res) { res.render('index', { title: "Home" }) });
    app.get('/home', function (req, res) { res.render('index', { title: "Home" }) });
    app.get('/about', function (req, res) { res.render('index', { title: "About me" }) });
    app.get('/projects', function (req, res) { res.render('index', { title: "Projects" }) });
    app.get('/services', function (req, res) { res.render('index', { title: "Services" }) });
    app.get('/contact', function (req, res) { res.render('index', { title: "Contact me" }) });
};