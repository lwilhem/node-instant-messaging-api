const express = require('express')
const router = express.Router()
const postController = require('../controller/post.constroller')

console.log('route post')
router.post('/', postController.createPost)
router.get('/', postController.getAllPost)
router.get('/:id', postController.getPostId)
router.put('/:id', postController.updatePostId)
router.delete('/:id', postController.deletePostId)

module.exports = router