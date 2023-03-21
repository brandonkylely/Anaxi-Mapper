require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const db = require("./config/connection");
const routes = require("./controllers");
const auth = require("./middleware/auth");
// require('./src')();

const database = module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    // useUnifiedTopology: true,
  };

  console.log(`${process.env.DB}`);
  try {
    mongoose.connect(`mongodb+srv://Anaxi-Mapper:${process.env.DB}@cluster0.aov6xcm.mongodb.net/?retryWrites=true&w=majority`)
  }
  catch (err) {
    console.log(err)
  }
}

database();

  // connect(connectionString, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  
  // module.exports = connection;
  
  // const { MongoClient, ServerApiVersion } = require('mongodb');
  // const uri = ;
  // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth);
app.use(routes);

app.use('/api/favorite', require('./controllers/api/favorite'));
app.use('/api/comment', require('./controllers/api/comment'));

// test route
app.get("/api/test", (req, res) => {
  console.log("test route hit");
  res.json({ message: "Hello from server!" });
});

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running http://localhost:${PORT}`);
  });
//   });
// });
