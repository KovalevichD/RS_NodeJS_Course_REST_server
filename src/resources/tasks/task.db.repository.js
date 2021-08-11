const Task = require('./task.model');

const getAllByBoardId = async boardId => {
  return await Task.find({ boardId }).exec();
};

const getAllByUserId = async userId => {
  return await Task.find({ userId }).exec();
};

const getById = async (_id, boardId) => {
  return await Task.findOne({ _id, boardId }).exec();
};

const createTask = async task => {
  return await Task.create(task);
};

const updateTask = async taskToUpdate => {
  return await Task.updateOne({ _id: taskToUpdate.id }, taskToUpdate).exec();
};

const deleteTask = async (id, boardId) => {
  return (await Task.deleteOne({ _id: id, boardId })).ok;
};

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  getById,
  createTask,
  updateTask,
  deleteTask
};
