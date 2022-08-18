const mongoose = require("mongoose")
const { defaultSchema } = require("./default")

const Client = mongoose.model(
  "client",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
        required: true
      },
      providers: {
        type: [{
            id: Number
        }],
      }
    },
    defaultSchema
  )
)
module.exports = Client