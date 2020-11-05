const Voca = require("../models/vocabulary")
Voca.find({}).then((result) => {
    console.log(result.length)
}).catch((err) => {

});