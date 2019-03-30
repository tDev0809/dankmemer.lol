const { MongoClient } = require('mongodb');
const { mongoURL } = require('../../config.json');

module.exports = async () => {
  module.exports = await MongoClient
    .connect(mongoURL, { useNewUrlParser: true })
    .then(conn => conn.db('website'))
    .then(db => db.collection('users'))
    .catch(e => {
      console.error('Failed to connect to MongoDB:', e.message);
    });
};
