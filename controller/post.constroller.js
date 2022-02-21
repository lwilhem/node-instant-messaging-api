const Post = require("../model/schema")

module.exports.createPost = (req, res, next) => {
    console.log('post test')
    const p = new Post({
        message: req.body.message,
        author: req.body.author
    })
    p.save()
        .then(() => res.status(201).json({message: "c'est good"}))
        .catch(e => {
            res.status(400).json({e})
        })
}

module.exports.getPostId = (req, res, next) => {
    console.log('get id')
    Post.findOne({_id:req.params.id})
        .then(post=> res.status(200).json(post))
        .catch(e=> res.status(404).json({e}))
}

module.exports.getAllPost = (req, res, next) => {
    console.log('get all post')
    Post.find()
        .then(post=> res.status(200).json(post))
        .catch(e=> res.status(404).json({e}))
}

module.exports.updatePostId = (req, res, next) => {
    console.log('delete id')
    Post.updateOne({_id: req.params.id},{
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