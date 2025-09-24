const express = require('express')
const likeService = require('../service/like')
const { ValidationError } = require('yup')
const router = express.Router()

const { addLikeRequestBodySchema, getLikeByUserIdBodySchema, getLikeByPostIdBodySchema, getLikeByIdParamsSchema, deleteLikeByIdParamsSchema } = require('../model/like')


router.post('/', async (req, res) => {
    try {
        const like = await addLikeRequestBodySchema.validate(req.body, { abortEarly: false })
        await likeService.addLike(like.userId, like.postId)
        res.status(201).json({ message: "likes created" })
    } catch (error) {
        if (error.message === "user and post both doesn't exist") {
            res.status(404).json({ message: "user and post both doesn't exist" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json((error.errors))
        }
        res.sendStatus(500)
    }
})

