const User = require('../models/userModel');
const { httpError } = require('../middleware/errorHandler');

exports.list = (req, res) => res.json(User.all());

exports.create = (req, res) => {
  const body = req.body || {};
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();

  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    throw httpError(400, 'A valid name and email are required');
  }
  res.status(201).json(User.create({ name, email }));
};