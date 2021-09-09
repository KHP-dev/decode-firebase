var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
var axios = require('axios');
var fs = require('fs');

var sl = require('../check/checksl');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
  
    filename: function(req, file, cb) {
      cb(null, req.session.tk + path.extname(file.originalname));
    }
})
  
var upload = multer({storage: storage});

router.get('/', (req, res) => {
    var soluong = sl();
    res.render('form.pug', {
      sl: soluong
    });
})
  

router.post('/', upload.single('file'), (req, res, next) => {
    const {fieldname: file} = req.file;
    run(req, res);
})

  
function decode(_data) {
    var data = JSON.stringify({
      "data": [
        _data
      ]
    });
    
    var config = {
      method: 'post',
      url: 'https://cbotserver.herokuapp.com/api/v1/cards',
      headers: { 
        'Authorization': 'cdcf6e8885c16f65ddbce478dfeacbc4', 
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    return new Promise(resolve => {
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
}
  
async function loop(reqq) {
    var data = fs.readFileSync('./uploads/'+ reqq.session.tk +'.txt', {encoding: "utf8"});
    data = data.split('\n');

    var add  = fs.readFileSync('./address.txt', { encoding: 'utf8'});
    add = add.split('\n');

    var dataDecode = [];

    for (var item of data) {
        await decode(item).then(async res => {
        var getAdd = add.shift();
        dataDecode.push(res.message[0] + "|" + getAdd);
        fs.writeFileSync('./address.txt', add.join('\n'));
        })
    }

    return dataDecode;
}
  
function run(reqq, ress) {
    loop(reqq).then(res => {
        fs.writeFileSync('./download/'+ reqq.session.tk +'.txt', res.join('\n'));
        var soluong = sl();
        ress.render('afterdecode.pug', {
        sl: soluong
        });
    });
}
  
module.exports = router;