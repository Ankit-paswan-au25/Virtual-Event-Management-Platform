const express = require('express');
const router = express.Router()
const User = require('../controller/userController')


router.route('/')
    .get(User.getAllUser)


router.route('/:id')
    .get(User.getSingleUser)
    .put(User.updateUser)
    .delete(User.deleteUser)

module.exports = router