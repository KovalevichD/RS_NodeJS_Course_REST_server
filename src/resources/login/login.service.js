const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRepo = require('../users/user.db.repository');
const { JWT_SECRET_KEY } = require('../../common/config');

const checkUser = async user => {
  const userDB = await usersRepo.getByLogin(user.login);
  const isVerifyUser = await bcrypt.compare(user.password, userDB.password);

  if (isVerifyUser) {
    const token = jwt.sign(
      { data: { userId: userDB.id, login: userDB.login } },
      JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    return { token };
  }
  return false;
};

module.exports = { checkUser };
