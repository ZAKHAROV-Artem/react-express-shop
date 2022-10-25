const ApiError = require("../error/ApiError");
const { Device } = require("../models/models");

class RatingController {
  async update(req, res) {
    const { id, rating } = req.body;
    await Device.update({ rating }, { where: { id } });
    return res.json({ message: "Successfully updated" });
  }
}

module.exports = new RatingController();
