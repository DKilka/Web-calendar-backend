const db = require("../db");
class UserController {
  async createUser(req, res) {
    const { username, password, email, icon } = req.body;
    const newPerson = await db.query(
      "INSERT INTO person (username, password, email, icon) values ($1, $2, $3, $4) RETURNING *",
      [username, password, email, icon]
    );

    res.json(newPerson.rows[0]);
  }
  async getUsers(req, res) {
    const users = await db.query("SELECT * FROM person");

    res.json(users.rows);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const users = await db.query("SELECT * FROM person where id = $1", [id]);

    res.json(users.rows[0]);
  }
  async updateUser(req, res) {
    const { id, username, password, email, icon } = req.body;
    const user = await db.query(
      "UPDATE person set username = $1, password = $2, email = $3, icon = $4 where id = $5 RETURNING *",
      [username, password, email, icon, id]
    );

    res.json(user.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    const users = await db.query("DELETE FROM person where id = $1", [id]);

    res.json(users.rows[0]);
  }
}

module.exports = new UserController();
