const router = require("express").Router();
const userRoutes = require("./users");
const taskRoutes = require("./tasks");

// Matches with "/api/users"
router.use("/users", userRoutes);
// Matches with "/api/tasks"
router.use("/tasks", taskRoutes);

module.exports = router;