const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    word: String,
    phoSymbol: String,
    translation: String
})
module.exports = Voca = mongoose.model("vocabularies", schema)