const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storageEngine = require('../util/ObjectStorageEngine');

const upload = multer({
    storage:storageEngine({
        destination: function (req, file, cb) {
            cb(null, 'profile')
        }
    })
});

router.post('/',upload.array('photos'), function(req, res, next) {
  res.json(req.files);
});

module.exports = router;
