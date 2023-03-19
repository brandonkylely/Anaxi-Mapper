const { Schema, Types, model } = require("mongoose");

const addressSchema = new Schema({
  address: String,
  coords: {
    lat: Number,
    lng: Number,
  },
  place_id: String,
  // results: [{
  //   results_id: Schema.Types.ObjectId,
  //   ref: "place"
  // }]
  //comments: [ref comments]
});

// Search: {
//   formatted origin address:
//     Places:
//       distances, routes
//       type

// }

const Address = model("address", addressSchema);
Address.createCollection().then(function (collection) {
  console.log("Address Collection is created!");
});
module.exports = Address;
