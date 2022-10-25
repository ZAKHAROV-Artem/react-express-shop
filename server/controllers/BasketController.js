const { BasketDevice, Basket } = require("../models/models");
const ApiError = require("../error/ApiError");
class BasketController {
  async create(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;
      const basketDevice = await BasketDevice.create({ basketId, deviceId });
      return res.json({ basketDevice });
    } catch (error) {
      return next(ApiError.badRequest("Create " + error));
    }
  }
  async remove(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;
      const basketDevice = await BasketDevice.destroy({
        where: { basketId, deviceId },
      });
      return res.json({ basketDevice });
    } catch (error) {
      return next(ApiError.badRequest(error));
    }
  }
  async get(req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      let data;
      const { userId, basketId, deviceId } = req.query;

      if (userId && !basketId) {
        data = await Basket.findOne({ where: { userId } });
        return res.json(data);
      }
      if (!userId && basketId && !deviceId) {
        data = await BasketDevice.findAll({ where: { basketId } });
        return res.json(data);
      }
      if (deviceId && basketId) {
        data = await BasketDevice.findOne({ where: { basketId, deviceId } });
        return res.json(data);
      }

      return res.json("Can not get data from the server");
    } catch (error) {
      return next(ApiError.badRequest(error));
    }
  }
  async updateCount(req, res, next) {
    try {
      const { value, deviceId, basketId } = req.body;

      const data = await BasketDevice.update(
        { count: value },
        { where: { deviceId, basketId } }
      );
      return res.json(data);
    } catch (error) {
      return next(ApiError.badRequest(error));
    }
  }
}

module.exports = new BasketController();
