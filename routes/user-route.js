const router = require("express").Router();
const UserController = require("../controllers/user-controller");

router.route("/register").post(UserController.insertUser);
router.route("/login").post(UserController.loginUser);

module.exports = router;
