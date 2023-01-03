let { MongoClient } = require("mongodb");

let data;

module.exports = {
  connectData: (cb) => {
    MongoClient.connect(
      "mongodb+srv://sinov12:47566566Aa.@cluster0.9d84gmb.mongodb.net/?retryWrites=true&w=majority"
    )
      .then((client) => {
        data = client.db();
        return cb();
      })
      .catch((error) => {
        console.log(error);
        return cb(error);
      });
  },
  getData: () => data,
};
