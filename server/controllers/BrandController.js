const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");
class BrandController {
  async create(req, res, next) {
    const { name } = req.body;
    if (!name) return next(ApiError.internal("Enter brand name"));
    const brand = await Brand.create({ name });
    return res.json({ brand });
  }
  async get(req, res) {
    if (req.method === "OPTIONS") {
      next();
    }
    let brands;

    const { id } = req.query;
    id
      ? (brands = await Brand.findAll({ where: { id } }))
      : (brands = await Brand.findAll());
    return res.json(brands);
  }
}

module.exports = new BrandController();
