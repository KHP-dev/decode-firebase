var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('express-session');
const cookieParser = require("cookie-parser");

const db = require('./model/index');
var up = require('./alwayup/up');
var decode = require('./controllers/decode.router');

var token = require('./check/authenToken');

var app = express();
app.set('views', './views');
app.set('view engine', 'pug')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: "baomatmanh2000", 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));
app.use(cookieParser());
app.use(express.static('public'));
// app.use(express.static('download'));

app.use('/decode', token.authToken, decode);

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login', (req, res) => {   
    res.render('login.pug');
})

app.get('/signup', (req, res) => {
    res.render('signup.pug');
})

// app.use('/api', token.authToken, router);

app.post('/login', async (req, res) => {
    db.login(req.body).then(ress=> {
        if(ress.login) {
            req.session.token = ress.if.token;
            req.session.tk = ress.if.user + ress.if.pass;
            res.redirect('/decode');
        }
        else res.redirect('/login');
    });
});

app.post('/signup', (req,res) => {
    var pass = req.body.pass;
    var cfpass = req.body.cfpass;

    if (pass === cfpass) {
        db.signup(req.body).then(ress => {
            if (ress.done) res.redirect('./login');
            else res.redirect('./signup');
        });
    }
    else {
        res.redirect('/signup');
    }
})


app.get('/download', (req, res) => {
    const file = `${__dirname}/download/${req.session.tk}.txt`;
    console.log(file);
    res.download(file);
})

app.listen(process.env.PORT || 3000);

setInterval(function() {
    // up.up1();
    up.up2();
}, 1500000);


