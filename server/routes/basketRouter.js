const Router = require("express");
const router = new Router();
const basketController = require("../controllers/BasketController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, basketController.create);
router.post("/remove", authMiddleware, basketController.remove);
router.get("/", authMiddleware, basketController.get);
router.put("/", authMiddleware, basketController.updateCount);

module.exports = router;
