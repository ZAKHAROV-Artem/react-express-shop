const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if ((!email && !password) || !email || !password) {
      return next(ApiError.badRequest("Incorreect email or password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("User with those email already exist"));
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashedPassword, role });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJWT(user.id, user.email, user.role);

    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("User with that email is not exist"));
    }

    const comparedPassword = bcrypt.compareSync(password, user.password);
    if (!comparedPassword) {
      return next(ApiError.badRequest("Incorrect email or password"));
    }
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }
  async delete(req, res, next) {
    try {
      const { id } = req.body;
      if (id !== req.user.id && req.user.role === "USER") {
        return next(ApiError.forbidden("You can not delete this user"));
      }
      await User.destroy({ where: { id } });
      return res.status(200).json({
        message: "Successfully deleted",
        user: req.user,
        deletedUserID: id,
      });
    } catch (error) {
      return next(ApiError.internal("Can not delete user by that id " + error));
    }
  }
  async auth(req, res) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
