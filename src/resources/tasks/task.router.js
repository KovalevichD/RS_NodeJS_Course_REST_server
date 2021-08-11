const router = require('express').Router();
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  getStatusText
} = require('http-status-codes');
const tasksService = require('./task.service');
const catchErrors = require('../../utils/catch-errors');
const ErrorHandler = require('../../utils/error-handler');
const Task = require('./task.model');

router.route('/:boardId/tasks/').get(
  catchErrors(async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await tasksService.getAllByBoardId(boardId);
    if (!tasks) {
      throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
    } else {
      res.status(OK).json(tasks.map(Task.toResponse));
    }
  })
);

router.route('/:boardId/tasks/:id').get(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const boardId = req.params.boardId;
    const task = await tasksService.getById(id, boardId);
    if (!task) {
      res.status(NOT_FOUND).send('Task is not found');
    } else {
      res.status(OK).json(Task.toResponse(task));
    }
  })
);

router.route('/:boardId/tasks/').post(
  catchErrors(async (req, res) => {
    const task = req.body;
    const boardId = req.params.boardId;
    task.boardId = boardId;
    const newTask = await tasksService.createTask(task);
    if (!newTask) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      res.status(OK).json(Task.toResponse(newTask));
    }
  })
);

router.route('/:boardId/tasks/:id').put(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const boardId = req.params.boardId;
    const update = req.body;
    update.id = id;
    update.boardId = boardId;
    const updatedTask = await tasksService.updateTask(update);
    if (!updatedTask) {
      throw new ErrorHandler(NOT_FOUND, 'Task is not found');
    } else {
      res.status(OK).json(Task.toResponse(update));
    }
  })
);

router.route('/:boardId/tasks/:id').delete(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const boardId = req.params.boardId;
    const deletedTask = await tasksService.deleteTask(id, boardId);
    if (!deletedTask) {
      throw new ErrorHandler(NOT_FOUND, 'Task is not found');
    } else {
      res.status(OK).send('Task is deleted');
    }
  })
);

module.exports = router;
