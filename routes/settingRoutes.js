const express = require("express");
const { findOne } = require("../model/credentials");
const User = require("../model/credentials");
const router = express.Router();

router.get("/settings/:username", async (req, res) => {
  const username = req.params.username;
  const result = await User.findOne({ username: username });
  res.render("settings", { title: "Preferences", user: result });
});
router.get("/reset", async (req, res) => {
  res.render("reset", { title: "Reset Password" });
});
router.get("/reset-data/:username", async (req, res) => {
  const username = req.params.username;
  const result = await User.findOne({ username: username });
  res.render("reset-data", { title: "Reset Details", user: result });
});
router.post("/resetpass", async (req, res) => {
  const name = req.body.email;
  const birth = req.body.dob;
  const result = await User.findOneAndUpdate(
    { email: name, dob: birth },
    { password: req.body.password }
  );
  if (result != null) {
    User.password = res.password;
    res.render("index", {
      title: "Discord",
      alrt: "Password Reset",
    });
  } else {
    res.render("index", { title: "Discord", alrt: "No such User" });
  }
});
router.post("/resetdata/:username", async (req, res) => {
  const username = req.params.username;
  const result = await User.findOneAndUpdate(
    { username: username },
    {
      username: req.body.username,
      email: req.body.email,
      dob: req.body.dob,
      pno: req.body.pno,
    }
  );
  if (result != null) {
    User.email = res.email;
    User.dob = res.dob;
    User.pno = res.pno;
    User.username = res.username;
    res.render("index", {
      title: "Discord",
      alrt: "Data Reset",
    });
  } else {
    res.render("index", { title: "Discord", alrt: "No such User" });
  }
});
router.post("/delete/", async (req, res) => {
  const username = req.body.username;
  const pass = req.body.password;
  const result = await User.findOneAndDelete({
    username: username,
    password: pass,
  });
  if (result != null) {
    res.render("index", { title: "Discord", alrt: "User Deleted" });
  } else {
    res.render("index", { title: "Discord", alrt: "User Not Deleted" });
  }
});
router.get("/delete/:username", async (req, res) => {
  const username = req.params.username;
  res.render("delete", { title: "Delete Account", username: username });
});

module.exports = router;
