const ApiError = require("../error/ApiError");
const { Type } = require("../models/models");

class TypeController {
  async create(req, res, next) {
    const { name } = req.body;
    if (!name) return next(ApiError.internal("Enter type name"));
    const type = await Type.create({ name });
    return res.json({ type });
  }
  async get(req, res) {
    if (req.method === "OPTIONS") {
      next();
    }
    const { id } = req.query;
    let types;
    id
      ? (types = await Type.findAll({ where: { id } }))
      : (types = await Type.findAll());
    return res.json(types);
  }
}

module.exports = new TypeController();
