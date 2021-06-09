const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/books"
router.route("/")
  .get(usersController.findAll);

  
// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);
  
// Matches with "/api/users/login"
router
  .route("/login")
  .post(usersController.findByEmail);

// Matches with "/api/users/sign-up"
router.route("/sign-up")
  .post(usersController.create);

module.exports = router;