const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const { Device, DeviceInfo } = require("../models/models");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest("Something went wrong! " + error));
    }
  }
  async remove(req, res, next) {
    try {
      let { id } = req.body;
      console.log(id);
      const device = await Device.destroy({
        where: {
          id,
        },
      });
      const infos = await DeviceInfo.destroy({ where: { deviceId: id } });

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest("Something went wrong! " + error));
    }
  }
  async getAll(req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    let { selectedBrands, selectedTypes, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;

    if (!selectedBrands && !selectedTypes) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (selectedBrands && selectedTypes) {
      devices = await Device.findAndCountAll({
        where: { brandId: selectedBrands, typeId: selectedTypes },
        limit,
        offset,
      });
    }
    if (selectedBrands && !selectedTypes) {
      devices = await Device.findAndCountAll({
        where: { brandId: selectedBrands },
        limit,
        offset,
      });
    }
    if (!selectedBrands && selectedTypes) {
      devices = await Device.findAndCountAll({
        where: { typeId: selectedTypes },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      return device
        ? res.json(device)
        : next(ApiError.badRequest("Page not found"));
    } catch (error) {
      next(ApiError.badRequest("Something went wrong! " + error));
    }
  }
}

module.exports = new DeviceController();
