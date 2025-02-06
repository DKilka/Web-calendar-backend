const Router = require("express");
const router = new Router();
const eventController = require("../controllers/event.controller");

router.post("/api/event", eventController.createEvent);
router.get("/api/event", eventController.getEventsByID);
router.put("/api/event/:id", eventController.updateEvent);

module.exports = router;
