const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const devicecontroller = require("../controllers/DeviceController");

router.post("/", roleMiddleware("ADMIN"), devicecontroller.create);
router.post("/remove", roleMiddleware("ADMIN"), devicecontroller.remove);
router.get("/", devicecontroller.getAll);
router.get("/:id", devicecontroller.getOne);

module.exports = router;
