// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const helpers = require('./utils/helpers');
// const sequelize = require('./config');
// const routes = require('./controllers');

// app = express();
// const PORT = process.env.PORT || 3001;

// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 300000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));
// const hbs = exphbs.create({ helpers });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);
// app.use('/api/favorite', require('./routes/favorite'));
// app.use('/api/comment', require('./routes/comment'));
// app.use('/api/users', require('./routes/user'));

// app.listen(PORT, () => {console.log(`http://localhost:${PORT}`);
// sequelize.sync({ force: false });
// });

const express = require("express");
const db = require("./config/index");
const routes = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

// test route
app.get("/api/test", (req, res) => {
  console.log("test route hit");
  res.json({ message: "Hello from server!" });
})

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});