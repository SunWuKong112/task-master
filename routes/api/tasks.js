const router = require("express").Router();
const tasksController = require("../../controllers/tasksController");

// Matches with "/api/tasks"
router.route("/")
     .get(tasksController.findAll);

// Matches with "/api/tasks/new"
router.route("/new")
     .post(tasksController.create);

// Matches with "/api/tasks/:id"
router
     .route("/:id")
     .get(tasksController.findById)
     .put(tasksController.update)
     .delete(tasksController.remove);

// Matches with "/api/tasks/by-author"
router
     .route("/by-author")
     .post(tasksController.findByAuthor);

module.exports = router;