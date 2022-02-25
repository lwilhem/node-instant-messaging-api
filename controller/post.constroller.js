const Post = require("../model/schema")

module.exports.createPost = (data, res) => {
    console.log('post message')
    const p = new Post({
        message: data.message,
        author: data.author
    })
    p.save()
}

module.exports.getPostId = (req, res, next) => {
    console.log('get id')
    Post.findOne({_id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(e => res.status(404).json({e}))
}

module.exports.getAllPost = () => {
    console.log('get all post')
    return Post.find()
        .then(post => post)
}

module.exports.updatePostId = (req, res, next) => {
    console.log('delete id')
    Post.updateOne({_id: req.params.id}, {
        message: req.body.message,
        author: req.body.author
    })
        .then(post => res.status(200).json(post))
        .catch(e => res.status(404).json({e}))
}

module.exports.deletePostId = (req, res, next) => {
    console.log('delete id')
    Post.deleteOne({_id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(e => res.status(404).json({e}))
}