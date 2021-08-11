const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const Task = new Schema(
  {
    _id: {
      type: String,
      default: uuid,
      require
    },
    title: String,
    order: Number,
    description: String,
    userId: {
      type: Schema.Types.Mixed,
      default: null
    },
    boardId: {
      type: Schema.Types.Mixed,
      default: null
    },
    columnId: {
      type: Schema.Types.Mixed,
      default: null
    }
  },
  { versionKey: false }
);

Task.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;

  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = model('Task', Task);
