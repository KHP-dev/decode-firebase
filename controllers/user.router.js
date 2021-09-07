var express = require('express');
var router = express.Router();

const db = require('../model/index');

// Thêm
router.post('/save', (req, res) => {
    if (checkConLai(req)) db.save(req.body);
    res.send('Save');
})

// Sửa
router.put('/update', (req, res) => {
    if (checkUpdate(req)) {
        db.update(req.body);
        res.send('Update');
    }
    else res.send('Update fail');
})

// Xóa
router.delete('/delete', (req, res) => {
    if (checkConLai(req)) db.delete(req.body);
    res.send("Delete");
})

// Truy vấn tất cả bản ghi
router.get('/users', (req, res) => {
    db.getAll(res);
})

// kiểm tra quyền
function checkUpdate(per) {
    return (per.permission === 'user' && per.body.id === per.user_id && per.body.perm ==='user') || per.permission === 'admin';
}

function checkConLai(req) {
    return req.permission === 'admin';
}

module.exports = router;