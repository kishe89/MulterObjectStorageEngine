const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storageEngine = require('../util/ObjectStorageEngine');

const upload = multer({
    storage:storageEngine({
        destination:  (req, file, cb) => {
            cb(null, 'profile')
        }
    })
});

router.post('/', upload.array('photos'), (req, res, next) => {
    res.json(req.files);
});

module.exports = router;
