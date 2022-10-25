const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserCotroller");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/delete", authMiddleware, userController.delete);
router.get("/auth", authMiddleware, userController.auth);

module.exports = router;
