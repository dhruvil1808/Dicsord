const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DBURI =
  "mongodb+srv://dhruvil1808:Dhruvil1234@cluster0.6wkxh.mongodb.net/Discord?retryWrites=true&w=majority";
const appRoutes = require("./routes/appRoutes");
const settingRoutes = require("./routes/settingRoutes");
var port = process.env.PORT || 3000;
const app = express();
const { Server } = require("socket.io");
const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

app.set("view engine", "ejs");
mongoose
  .connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
  //socket.on("login", ({ name, room }, callback) => {});
});
//routes
app.use(settingRoutes);
app.use(appRoutes);
