var router = require("express").Router();
var verifyUser = require("./auth/auth").verifyUser;
var userExists = require("./auth/auth").userExists;
var controller = require("./auth/controller");
var userController = require("./user/userController");

// api router will mount other routers
// for all our resources
router.use("/users", require("./user/userRoutes"));
router.route("/login").post(verifyUser(), controller.signin);
router.route("/signup").post(userExists(), userController.post);
//router.use('/categories', require('./category/categoryRoutes'));
//router.use('/posts', require('./post/postRoutes'));

module.exports = router;
