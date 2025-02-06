const db = require("../db");

class eventController {
  async createEvent(req, res) {
    const {
      title,
      timestamp,
      time,
      allday,
      repeat,
      user_id,
      description,
      repeatid,
    } = req.body;
    const newEvent = await db.query(
      "INSERT INTO event (title, timestamp, time, allday, repeat, user_id, description, repeatid) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [title, timestamp, time, allday, repeat, user_id, description, repeatid]
    );

    res.json(newEvent.rows[0]);
  }
  async getEventsByID(req, res) {
    const id = req.query.id;
    const events = await db.query("SELECT * FROM event where user_id = $1", [
      id,
    ]);

    res.json(events.rows);
  }
  async updateEvent(req, res) {
    const id = req.params.id;
    const { title, timestamp, time, allday, repeat, description, repeatid } =
      req.body;
    const event = await db.query(
      "UPDATE event set title = $1, timestamp = $2, time = $3, allday = $4, repeat = $5, description = $6, repeatid = $7 where id = $8 RETURNING *",
      [title, timestamp, time, allday, repeat, description, repeatid, id]
    );

    res.json(event.rows);
  }
}

module.exports = new eventController();
