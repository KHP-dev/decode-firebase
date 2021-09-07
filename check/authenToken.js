var jwt = require('jsonwebtoken');

var ACCEST_TOKEN_SECRET = 'baomatratmanh123';

module.exports.signToken = function(user) {
    var accessToken = jwt.sign(user, ACCEST_TOKEN_SECRET);
    return accessToken;
}

module.exports.authToken = function(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) res.sendStatus(401);
    else {
        jwt.verify(token, ACCEST_TOKEN_SECRET, (err, data) => {
            req.permission = data.permission;
            req.user_id = data.id;
            if (err) res.sendStatus(403);
            else next();
        })
    }
}