const router = require('express').Router();
const { NOT_FOUND, OK } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const catchErrors = require('../../utils/catch-errors');
const ErrorHandler = require('../../utils/error-handler');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    if (!users) {
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    } else {
      res.status(OK).json(users.map(User.toResponse));
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const user = await usersService.getById(id);
    if (!user) {
      throw new ErrorHandler(NOT_FOUND, 'User is not found');
    } else {
      res.status(OK).json(User.toResponse(user));
    }
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = req.body;
    const { login, password } = user;
    if (!login || !password) {
      throw new ErrorHandler(
        NOT_FOUND,
        'Missing required login and password fields'
      );
    } else {
      const newUser = await usersService.createUser(user);
      res.status(OK).json(User.toResponse(newUser));
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    update.id = id;
    const updatedUser = await usersService.updateUser(update);
    if (!updatedUser) {
      throw new ErrorHandler(NOT_FOUND, 'User is not found');
    } else {
      res.status(OK).json(User.toResponse(update));
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const deletedUser = await usersService.deleteUser(id);
    if (!deletedUser) {
      throw new ErrorHandler(NOT_FOUND, 'User is not found');
    } else {
      res.status(OK).send('User is deleted');
    }
  })
);

module.exports = router;
