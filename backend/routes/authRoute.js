const router = require("express").Router();
const {
  loginController,
  registerController,
  logoutController,
  refreshController,
} = require("../controllers/authController.js");
const { protect } = require("../middlewares/auth.js");

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);
router.post("/refresh", refreshController);

module.exports = router;