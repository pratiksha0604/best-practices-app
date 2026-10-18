const Task = require('../models/taskModel');
const User = require('../models/userModel');
const { httpError } = require('../middleware/errorHandler');

const STATUSES = ['pending', 'in_progress', 'done'];

function getTaskOr404(id) {
  const task = Task.find(id);
  if (!task) throw httpError(404, 'Task not found');
  return task;
}

exports.list = (req, res) => res.json(Task.all());

exports.get = (req, res) => res.json(getTaskOr404(Number(req.params.id)));

exports.create = (req, res) => {
  const body = req.body || {};
  const title = String(body.title || '').trim();
  const status = body.status || 'pending';
  const user_id = Number(body.user_id);

  if (!title) throw httpError(400, 'Title is required');
  if (!STATUSES.includes(status)) throw httpError(400, 'Invalid status');
  if (!User.find(user_id)) throw httpError(400, 'user_id must belong to an existing user');

  const task = Task.create({
    user_id,
    title,
    description: body.description || null,
    status,
  });
  res.status(201).json(task);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const existing = getTaskOr404(id);
  const body = req.body || {};

  const title = body.title !== undefined ? String(body.title).trim() : existing.title;
  const status = body.status !== undefined ? body.status : existing.status;
  const description = body.description !== undefined ? body.description : existing.description;

  if (!title) throw httpError(400, 'Title cannot be empty');
  if (!STATUSES.includes(status)) throw httpError(400, 'Invalid status');

  res.json(Task.update(id, { title, description, status }));
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  getTaskOr404(id);
  Task.remove(id);
  res.status(204).end();
};