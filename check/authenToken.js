var jwt = require('jsonwebtoken');

var ACCEST_TOKEN_SECRET = 'baomatratmanh123';

module.exports.signToken = function(user) {
    var accessToken = jwt.sign(user, ACCEST_TOKEN_SECRET);
    return accessToken;
}

module.exports.authToken = function(req, res, next) {
    // const token = req.headers['authorization'];
    const token = req.session.token;
    if (!token) res.sendStatus(401);
    else {
        jwt.verify(token, ACCEST_TOKEN_SECRET, (err, data) => {
            if (err) res.sendStatus(403);
            else next();
        })
    }
}