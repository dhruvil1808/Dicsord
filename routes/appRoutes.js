const express = require("express");
const { findOne } = require("../model/credentials");
const User = require("../model/credentials");
const router = express.Router();

router.post("/create-user", async (req, res) => {
  const user = new User(req.body);
  const r1 = await User.findOne({ username: user.username });
  const r2 = await User.findOne({ email: user.email });
  const r3 = await User.findOne({ pno: user.pno });
  if (!r1 || !r2 || !r3) {
    user
      .save()
      .then((result) => {
        res.render("index", {
          title: "Discord",
          alrt: "User Created Successfully",
        });
      })
      .catch((err) => {
        res.render("404", { title: "404 Error" });
      });
  } else {
    res.render("sign-up", { title: "Sign Up", alrt: "User Already Exists" });
  }
});
router.get("/", (req, res) => {
  res.render("index", { title: "Discord", alrt: "" });
});
router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
router.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "Sign Up", alrt: "" });
});
router.get("/chat/", async (req, res) => {
  const name = req.query.search1;
  const pass = req.query.search2;
  var result = await User.findOne({ email: name, password: pass });
  if (result == null) {
    result = await User.findOne({ pno: name, password: pass });
  }
  if (result == null) {
    result = await User.findOne({ username: name, password: pass });
  }
  if (result != null) {
    User.find({})
      .sort({ createdAt: -1 })
      .then((results) => {
        res.render("chat", { users: results, title: result.username });
      })
      .catch((err) => {
        res.render("404", { title: "404 Error" });
      });
  } else {
    res.render("index", { title: "Discord", alrt: "Invalid Credentials" });
  }
});
router.use((req, res) => {
  res.render("404", { title: "404 Error" });
});
module.exports = router;
