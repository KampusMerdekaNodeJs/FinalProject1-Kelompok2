const router = require("express").Router();
const reflectionController = require("../controllers/reflection-controller");
const bodyMiddleware = require("../middlewares/body-middleware");
router
  .route("/")
  .get(reflectionController.getAllData) 
  .post(bodyMiddleware, reflectionController.postData);

router
  .route("/:id")
  .put(reflectionController.updateData)
  .delete(reflectionController.deleteData);

module.exports = router;
