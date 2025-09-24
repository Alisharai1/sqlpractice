const express = require('express')
const commentSerivice = require('../service/comment')
const router = express.Router()
const { ValidationError } = require('yup')
const { addCommentRequestBodySchema, getCommentByIdRequestParamsSchema, getCommentByPostIdRequestParamsSchema, deleteCommentByIdRequestParamsSchema, updateCommentRequestBodySchema } = require('../model/comment')

router.post('/', async (req, res) => {
    try {
        const comment = await addCommentRequestBodySchema.validate(req.body, { abortEarly: false })
        const newComment = await commentSerivice.addComment(comment.userId, comment.postId, comment.message)
        res.status(201).json(newComment)
    } catch (error) {
        if (error.message === "user doesn't exist") {
            res.status(400).json({ message: "user doesn't exist" })
        }
        else if (error.message === "post doesn't exist") {
            res.status(400).json({ message: "post doesn't exist" })

        }
        else if (error instanceof ValidationError) {
            res.status(400).json(error.errors)
        }
        res.sendStatus(500)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = await getCommentByIdRequestParamsSchema.validate(req.params, { abortEarly: false })
        const comment = await commentSerivice.getCommentById(id)
        res.status(200).json(comment)
    } catch (error) {
        if (error.message === "comment doesn't exist") {
            res.status(400).json({ message: "comment doesn't exist" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json(error.errors)
        }
        res.sendStatus(500)
    }
})

router.delete('/:id,', async (req, res) => {
    try {
        const { id } = await getCommentByIdRequestParamsSchema.validate(req.params, { abortEarly: false })
        await commentSerivice.deleteComment(id)
        res.status(200).json({ message: "comment successfully deleted" })
    } catch (error) {
        if (error.message === "comment doesn't exist") {
            res.status(400).json({ message: "comment doesn't exist" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json(error.errors)
        }
        res.sendStatus(500)
    }        res.sendStatus(500)

})

module.exports = router;