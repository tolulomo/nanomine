const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiSchema = new Schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    token: {
      type: String,
    }
  }
)

module.exports = mongoose.model('api', apiSchema)
