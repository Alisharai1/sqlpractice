const express = require('express')
const postService = require('../service/post')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { userId, description } = req.body
        const newPost = await postService.addPost(userId, description)
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error);

        if (error.message === "post doesn't exist") {
            res.status(404).json({ message: "post not found" })
        }
        else if (error.message === "user not found") {
            res.status(404).json({ message: "user not found" })

        }
        res.sendStatus(500)
    }

})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await postService.getPostById(id)
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        if (error.message === "post doesn't exist") {
            res.status(404).json({ message: "post not found" })
        }
        res.sendStatus(500)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await postService.deletePost(id)
        res.status(200).json({ message: "post successfully deleted" })
    } catch (error) {
        console.log(error);
        if (error.message === "post doesn't exist") {
            res.status(404).json({ message: "post not found" })
        }
        res.sendStatus(500)
    }

})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updatedPost = await postService.updatePost(id, description)
        res.status(200).json(updatedPost)

    } catch (error) {
        console.log(error);
        if (error.message === "post doesn't exist") {
            res.status(404).json({ message: "post not found" })
        }
        res.sendStatus(500)
    }
})

router.get('/', async (req, res) => {
    try {
        const { description, page } = req.query

        const posts = await postService.getPostsByDescription(description, page)
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = router;