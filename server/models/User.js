const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const schemaSavedSearch = new Schema({
  search: [{ type: Object }],
  coords: { lat: { type: Number }, lng: { type: Number } },
  address: { type: String },
  radius: { type: Number },
  type: { type: String },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  favorites: {
    type: [schemaSavedSearch],
    default: [],
  },
  // favorites: [
  // {addresses: [{places}], comments: [{comments}] } ,
  // {addresses: [{places}], comments: [{comments}] }
  // ]
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.addSearchToFavorites = async function (
  searchResults,
  currentParams
) {
  const newSearch = {
    search: searchResults,
    coords: currentParams.coords,
    address: currentParams.address,
    radius: currentParams.radius,
  };
  console.log("LOGGING newSearch", newSearch);
  this.favorites.push(newSearch);
  return this.save();
};

userSchema.methods.getFavorites = async function () {
  return this.favorites;
};

userSchema.methods.getId = async function () {
  return this._id;
};

const User = model("user", userSchema);

module.exports = User;
