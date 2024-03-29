const path = require("path");
require("dotenv").config();
const express = require("express");
const db = require("./config/connection");
const routes = require("./controllers");
const auth = require("./middleware/auth");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth);
app.use(routes);

app.use("/api/favorite", require("./controllers/api/favorite"));
app.use("/api/comment", require("./controllers/api/comment"));

// test route
// app.get("/api/test", (req, res) => {
//   console.log("test route hit");
//   res.json({ message: "Hello from server!" });
// });
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running http://localhost:${PORT}`);
  });
});
