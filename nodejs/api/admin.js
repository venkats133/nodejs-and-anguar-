const express = require('express');
const db = require('../db/connection');
const loginusers = db.get('loginusers');
const router = express.Router();

/* Signin */
router.post('/signin', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    const user = await loginusers.findOne({name, password});
    if(!user){
      const error = new Error('User does not exist');
       
      // res.status(201).json({
      //   _id: user._id,
      //   message: 'User does not exist',
      //   status: 333
      // });
      return next(error);
    }else{
    
      res.status(201).json({
        _id: user._id,
        message: 'Logged in successfully',
        status: 111
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const user = await loginusers.find();
    if(!user){
      const error = new Error('User does not exist');
      return next(error);
    }
    
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
/* Create a new user */
router.post('/signup', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    const user =  await loginusers.findOne({name});
    
    // user already exists
    if (user) {
      const error = new Error('User already exists');
      res.status(409).json({
        message: 'User already exists',
      }); // conflict error
      return next();
    }
    
    const login = await loginusers.insert({name, password});
    res.status(201).json({
      message: 'user has been created',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;