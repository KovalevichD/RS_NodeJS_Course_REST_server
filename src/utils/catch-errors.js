const catchErrors = func => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = catchErrors;
