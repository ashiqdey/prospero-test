var express = require('express');
var router = express.Router();

var studentController = require('../controllers/student.controller');

router.get('/', studentController.getStudents);
router.post('/', studentController.addStudent);

// router.get('/add-dummy', studentController.addDummyStudent);

module.exports = router;