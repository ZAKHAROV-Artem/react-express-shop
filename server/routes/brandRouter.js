const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const brandController = require("../controllers/BrandController");

router.post("/", roleMiddleware("ADMIN"), brandController.create);
router.get("/", brandController.get);

module.exports = router;
