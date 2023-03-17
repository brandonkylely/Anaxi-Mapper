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
});


const Address = model("address", addressSchema);
module.exports = Address;