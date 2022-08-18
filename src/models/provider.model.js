const mongoose = require("mongoose")
const { defaultSchema } = require("./default")

const Provider = mongoose.model(
  "provider",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
    },
    defaultSchema
  )
)
module.exports = Provider