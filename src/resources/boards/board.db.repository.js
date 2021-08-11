const Board = require('./board.model');

const getAll = async () => {
  return await Board.find({}).exec();
};

const getById = async id => {
  return await Board.findById(id).exec();
};

const createBoard = async board => {
  return Board.create(board);
};

const updateBoard = async boardToUpdate => {
  return await Board.updateOne({ _id: boardToUpdate.id }, boardToUpdate).exec();
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).ok;
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
