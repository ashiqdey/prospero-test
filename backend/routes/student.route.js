var express = require('express');
var router = express.Router();

var studentController = require('../controllers/student.controller');

router.get('/', studentController.getStudents);
router.post('/', studentController.addStudent);

module.exports = router;