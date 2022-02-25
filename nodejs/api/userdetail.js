const express = require('express');
const db = require('../db/connection');
const userdetail = db.get('userdetails');
const router = express.Router();

/* Get all user detail */
router.get('/', async (req, res, next) => {
    try {
      const allUsers = await userdetail.find({});
      res.json({UserDetail:allUsers, status: 111});
      console.log(res);
    } catch (error) {
      next(error);
    }
});

/* Get a specific user */
router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userdetail.findOne({
        _id: id,
      });
  
      if (!user) {
        const error = new Error('User does not exist');
        return next(error);
      }
  
      res.json(user);
    } catch (error) {
      next(error);
    }
  });
/* Insert a new user detail */
router.post('/', async (req, res, next) => {
    try {
      const { name, dob, gender, email, phone, Address } = req.body;
      console.log(name);
      const user = await userdetail.findOne({name});
      
      // user already exists
      if (user) {
        const error = new Error('User already exists');
        // res.status(409); // conflict error
        return next(error);
      }
      
      const login = await userdetail.insert({name, dob, gender, email, phone, Address});
      res.status(201).json({
        message: 'user detail has been inserted',
        status: 111
      });
    } catch (error) {
      next(error);
    }
});


/* Update a specific user */
router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = req.body;
      const user = await userdetail.findOne({
        _id: id,
      });
      console.log(result);
      // user does not exist
      if (!user) { 
        const error = new Error('User detail not found');
        return next(error);
      }
  
      const updatedUser = await userdetail.update({
        _id: id,
      }, { $set: result },
      { upsert: true });
  
      res.json({
        message: 'user has been updated',
        status: 111
      });
    } catch (error) {
      next(error);
    }
  });

  /* Delete a specific user */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userdetail.findOne({
      _id: id,
    });

    // user does not exist
    if (!user) {

      const error = new Error('User detail deletion failed');
      return next(error);
    }
    await userdetail.remove({
      _id: id,
    });

    res.json({
      message: 'user has been deleted',
      status: 111
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;