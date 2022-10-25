const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const typeController = require("../controllers/TypeController");

router.post("/", roleMiddleware("ADMIN"), typeController.create);
router.get("/", typeController.get);
module.exports = router;
