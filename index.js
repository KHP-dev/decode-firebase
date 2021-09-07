var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
// var shortid = require('shortid'); //dùng để tạo ngẫu nhiên id

const db = require('./model/index');

var token = require('./check/authenToken');
const router = require('./controllers/user.router');

var app = express();
app.set('views', './views');
app.set('view engine', 'pug')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello');
})

app.use('/api', token.authToken, router);

app.post('/login', async (req, res) => {
    var user = await db.authen(req.body);
    req.body.permission = user.info.permission;
    req.body.id = user.id;
    if (user !== undefined) {
        // res.send("Valid")
        res.send({
            my_id: user.id,
            token: token.signToken(req.body)
        });
    }
    else res.send("Invalid");
});

app.listen(process.env.PORT || 3000);

setInterval(function() {
    http.get("https://firebase-user.herokuapp.com/");
}, 1500000);