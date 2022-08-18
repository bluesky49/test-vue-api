const mongoose = require("mongoose") 

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://ming:qwe123@test-vue.2yz4jpd.mongodb.net/?retryWrites=true&w=majority")
    console.log(`🚀  Successfully connected to database`)
  } catch(err) {
    console.log("DB Connection Failed!")
  }
}
module.exports = { connectToDatabase }