const { Schema, Types, model } = require("mongoose");

const addressSchema = new mongoose.Schema({
    address: String,
    coords: {
        lat: Number,
        lng: Number,
    },
    place_id: String,
});


const Address = model("address", addressSchema);
module.exports = Address;