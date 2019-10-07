const express = require('express');
const router = express.Router();
const { Course, User } = require('../models');
const authenticateUser = require('./authenticate');

//Returns a list of courses (includin the user that owns this course)
router.get('/', async (req, res, next) => {
    const courses = await Course.findAll({ 
        include: { model: User, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } }, //Xtra Credit
        attributes: { exclude: ['createdAt', 'updatedAt'] } //Xtra Credit
    });
    res.json(courses);
});

//Returns a course (including the user that owns the course) for the provided course ID
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const course = await Course.findByPk(id, { 
        include: { model: User, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } }, 
        attributes: { exclude: ['createdAt', 'updatedAt'] } 
    });
    res.json(course);
});

//Creates a course
router.post('/', authenticateUser, async (req, res, next) => {
    const course = req.body;
    course.userId = req.currentUser.id;

    try {
        const newCourse= await Course.create(course);
        const uri = `${req.originalUrl}/${newCourse.id}`;
        res.set('Location', uri);
        res.status(201).end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            error.message = 'Validation Error';
            error.status=400;
      } 
      next(error);
    } 
});

//Updates course returns no content
router.put('/:id', authenticateUser, async (req, res, next) => {
    const id = req.params.id;
    try {
        const course = req.body;
        course.userId = req.currentUser.id;
        const courseToUpdate = await Course.findByPk(id, { include: [ User ] });
        if (courseToUpdate.userId === req.currentUser.id) {
            courseToUpdate.update(course);
            res.status(204).end();
        } else {
            res.status(403).end();
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            error.message = 'Validation Error';
            error.status=400;
        }
    }    next(error);
});

//Deletes a course and returns no content
router.delete('/:id', authenticateUser, async (req, res, next) => {
    const id = req.params.id;
    const course = await Course.findByPk(id, { include: [ User ] });
    if (req.currentUser.id === course.userId) {
        course.destroy();
        res.status(204).end(); 
    } else {
        res.status(403).end();
    }
});
module.exports = router;