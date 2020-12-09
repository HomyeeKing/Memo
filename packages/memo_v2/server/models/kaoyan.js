const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    word: {
        type: String,
    },
    phoSymbol: {
        type: String,
    },
    audio: String,
    translation: {
        type: String,
    },
});

module.exports = mongoose.model('kaoyan', schema);
