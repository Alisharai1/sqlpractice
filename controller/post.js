const express = require('express')
const postService = require('../service/post')
const router = express.Router()
const { addPostRequestBodyBySchema, getPostRequestParamsSchema, patchPostRequestBodySchema, getPostRequestQuerySchema } = require('../model/post')

const { ValidationError } = require('yup')

router.post('/', async (req, res) => {
    try {
        // const { userId, description } = req.body
        const post = await addPostRequestBodyBySchema.validate(req.body, { abortEarly: false })
        const newPost = await postService.addPost(post.userId, post.description)
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error);

        if (error.message === "post doesn't exist") {
            res.status(404).json({ message: "post not found" })
        }
        else if (error.message === "user not found") {
            res.status(404).json({ message: "user not found" })

        }
        else if (error instanceof ValidationError) {
            res.status(400).json((error.errors));
        }
        res.sendStatus(500)
    }

})

router.get('/:id', async (req, res) => {
    try {
        // const { id } = req.params
        const { id } = await getPostRequestParamsSchema.validate(req.params, { abortEarly: false })
        const post = await postService.getPostById(id)
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        if (error.message === "post doesn't exist") {
            res.status(404).json({ message: "post not found" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json((error.errors));
        }
        res.sendStatus(500)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        // const { id } = req.params
        const { id } = await getPostRequestParamsSchema.validate(req.params, { abortEarly: false })
        await postService.deletePost(id)
        res.status(200).json({ message: "post successfully deleted" })
    } catch (error) {
        console.log(error);
        if (error.message === "post doesn't exist") {
            res.status(404).json({ message: "post not found" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json((error.errors));
        }
        res.sendStatus(500)
    }

})

router.patch('/:id', async (req, res) => {
    try {
        // const { id } = req.params
        const { id } = await getPostRequestParamsSchema.validate(req.params, { abortEarly: false })
        // const { description } = req.body
        const { description } = await patchPostRequestBodySchema.validate(req.body, { abortEarly: false })

        const updatedPost = await postService.updatePost(id, description)
        res.status(200).json(updatedPost)

    } catch (error) {
        console.log(error);
        if (error.message === "post doesn't exist") {
            res.status(404).json({ message: "post not found" })
        }
        if (error instanceof ValidationError) {
            res.status(400).json((error.errors));
        }
        res.sendStatus(500)
    }
})

router.get('/', async (req, res) => {
    try {
        // const { description, page } = req.query
        const { description, page } = await getPostRequestQuerySchema.validate(req.query, { abortEarly: false })

        const posts = await postService.getPostsByDescription(description, page)
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        if (error instanceof ValidationError) {
            res.status(400).json((error.errors));
        }
        res.sendStatus(500)
    }
})

module.exports = router;