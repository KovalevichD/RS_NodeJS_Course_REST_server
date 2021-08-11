const User = require('./user.model');

const getAll = async () => {
  return await User.find({}).exec();
};

const getByLogin = async login => {
  return await User.findOne({ login }).exec();
};

const getById = async id => {
  return await User.findById(id).exec();
};

const createUser = async user => {
  return await User.create(user);
};

const updateUser = async userToUpdate => {
  return await User.updateOne({ _id: userToUpdate.id }, userToUpdate).exec();
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).ok;
};

module.exports = {
  getAll,
  getByLogin,
  getById,
  createUser,
  updateUser,
  deleteUser
};
