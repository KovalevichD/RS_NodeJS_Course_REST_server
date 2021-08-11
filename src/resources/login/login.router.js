const router = require('express').Router();
const { OK, getStatusText, FORBIDDEN } = require('http-status-codes');
const loginService = require('./login.service');
const catchErrors = require('../../utils/catch-errors');
const ErrorHandler = require('../../utils/error-handler');

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = req.body;
    const verifyUser = await loginService.checkUser(user);
    if (!verifyUser) {
      throw new ErrorHandler(FORBIDDEN, getStatusText(FORBIDDEN));
    } else {
      res.status(OK).json(verifyUser);
    }
  })
);

module.exports = router;
