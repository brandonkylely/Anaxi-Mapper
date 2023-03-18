const { Address } = require("../models");
module.exports = {
  createAddress(req, res) {
    Address.create(req.body)
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => res.status(500).json(err));
  },
};
