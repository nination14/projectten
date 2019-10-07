const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const authenticateUser = require('./authenticate');
const { User } = require('../models');

/* GET users listing. */
router.get('/', authenticateUser, function(req, res, next) {
  res.json(req.currentUser);
});

/* POST sets location header  */
router.post('/', async (req, res, next) => {
  const user = req.body;
  try {
    user.password = bcryptjs.hashSync(user.password || '');
    
    const createdUser = await User.create(user);
    
    if (createdUser) {
      res.set('Location', '/');
      return res.status(201).end();
    } else {
      throw Error('Could not create user');
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      error.message = 'Validation Error';
      error.status=400;
    }
    next(error);
  }
});



// //Get the current user.
// router.get('/', authenticateUser, function(req, res, next) {

//   return res.status(200).json({
//     userId: req.currentUser.get("id"),
//     firstName: req.currentUser.get("firstName"),
//     lastName: req.currentUser.get("lastName"),
//     emailAddress: req.currentUser.get("emailAddress")
//   })
// });

/* Returns a list of courses */
module.exports = router;
