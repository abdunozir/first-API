const { MongoClient } = require("mongodb");

module.exports = {
  oneUser: () => {
    MongoClient.connect();
  },
};
