const tasksRepo = require('./task.db.repository');

const getAllByBoardId = async boardId =>
  await tasksRepo.getAllByBoardId(boardId);
const getById = async (id, boardId) => await tasksRepo.getById(id, boardId);
const createTask = async task => await tasksRepo.createTask(task);
const updateTask = async task => await tasksRepo.updateTask(task);
const deleteTask = async (id, boardId) =>
  await tasksRepo.deleteTask(id, boardId);

module.exports = {
  getAllByBoardId,
  getById,
  createTask,
  updateTask,
  deleteTask
};
