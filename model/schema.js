const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    message: {type:String, require:true},
    author: {type:String, require:true}
})

module.exports = mongoose.model('Post', postSchema)