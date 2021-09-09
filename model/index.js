var admin = require("firebase-admin");

var token = require('../check/authenToken');
var serviceAccount = require("./user-management-pj1-firebase-adminsdk-8rfdq-fef8e37c84.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://user-management-pj1-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

var db = admin.database();
var ref = db.ref('users');

module.exports.save = function(userr) {
    userr.id = ref.push().key;
    console.log(userr);
    ref.child(userr.id).set({
        user: userr.user,
        pass: userr.pass,
        count: 0,
        token: userr.token
    });
};

module.exports.update = function(user) {
    var newData = {
        user: user.name,
        pass: user.pass,
        permission: user.perm
    }
    ref.child(user.id).update(newData);
}

module.exports.delete = function(user) {
    ref.child(user.id).remove();
}

module.exports.getAll = function(res) {
    var data;
    ref.orderByKey().on('value', (snapshot) => {
        data = snapshot.val();
        res.send(data);
    })
}

module.exports.login = (user) => {
    return new Promise(resolve => {
        var us;
        var ps;
        ref.orderByChild('user').equalTo(user.name).on('value', (snapshot) => {
            us = Object.values(snapshot.val());
            if (us === null || us === undefined) resolve({ login: false});
            else {
                if (us[0].pass === user.pass) resolve({
                    login: true,
                    if: us[0]
                })
                resolve({
                    login: false
                })
            }
        });
    })
}

module.exports.signup = (user) => {
    return new Promise(resolve => {
        ref.orderByChild('user').equalTo(user.name).on('value', (snapshot) => {
            var data = snapshot.val();
            if (data === null || data === undefined) {
                var usern = user.name;
                var pass = user.pass;
                var tokenu = token.signToken({
                    user: usern,
                    pass: pass
                });

                var u = {
                    user: usern,
                    pass: pass,
                    token: tokenu
                }

                this.save(u);
                resolve({ done: true});
            }
            else resolve({ done: false });
        });
    });
}