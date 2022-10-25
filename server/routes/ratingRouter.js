const Router = require("express");
const router = new Router();
const ratingController = require("../controllers/RatingController");
const authMiddleware = require("../middleware/authMiddleware");

router.put("/", authMiddleware, ratingController.update);

module.exports = router;
