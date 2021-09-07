var admin = require("firebase-admin");

var serviceAccount = require("./user-management-pj1-firebase-adminsdk-8rfdq-fef8e37c84.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://user-management-pj1-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

var db = admin.database();
var ref = db.ref('users');

module.exports.save = function(user) {
    user.id = ref.push().key;
    ref.child(user.id).set({
        user: user.name,
        password: user.pass,
        permission: user.perm
    });
};

module.exports.update = function(user) {
    var newData = {
        user: user.name,
        password: user.pass,
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

module.exports.authen = function(userQ) {
    // console.log(user);
    var data;
    return new Promise(function(resolve) {
        ref.orderByKey().on('value', (snapshot) => {
            data = snapshot.val();
            // data = Object.values(data)

            var check;

            for (var userDB in data) {
                if (data[userDB].user === userQ.name && data[userDB].password === userQ.pass) {
                    check = userDB;
                    break;
                }
            }

            // var check = data.find(userDB => {
            //     return userDB.user === user.name && userDB.password === user.pass;
            // });
            resolve({
                id: check,
                info: data[check]
            });
        })
    })
}

