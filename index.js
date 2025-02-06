const cors = require("cors");
const express = require("express");
const userRouter = require("./routes/user.routes");
const eventRouuter = require("./routes/event.routes");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

app.use("/", userRouter);
app.use("/", eventRouuter);

app.listen(PORT, () => console.log("PORT:", PORT));
