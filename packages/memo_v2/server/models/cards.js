const mongoose = require('mongoose')
const schema = new mongoose.Schema({
	cardName: {
		type: String,
		required: true
	},
	cover: Buffer,
	words: Array
})
module.exports = mongoose.model('cards', schema)
