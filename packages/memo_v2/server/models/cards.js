const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    cardName: {
        type: String,
        required: true,
    },
    cover: Buffer,
});
module.exports = Card = mongoose.model('cards', schema);
