const express = require("express");
const userService = require('../service/user')
const router = express.Router();
const { addUserRequestBodySchema, getUserByIdRequestParamsSchema, patchUserRequestBodySchema } = require("../model/user");

const { ValidationError } = require("yup");


router.post("/", async (req, res) => {
    try {
        // const { name, email, age } = req.body
        const user = await addUserRequestBodySchema.validate(req.body, { abortEarly: false })
        const newUser = await userService.addUser(user.name, user.email, user.age)
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error);
        if (error.message === "duplicate email id") {
            res.status(400).json({ message: "Email id already exist" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json(error.errors)
        }

        res.sendStatus(500)
    }
})

router.get("/:id", async (req, res) => {
    try {

        // const { id } = req.params 
        const { id } = await getUserByIdRequestParamsSchema.validate(req.params, { abortEarly: false })
        const user = await userService.getUserById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        if (error.message === "user doesn't exist") {
            res.status(404).json({ message: "user doesn't exist" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json(error.errors)
        }
        res.sendStatus(500)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        // const { id } = req.params
        // const { name, age } = req.body
        const { id } = await getUserByIdRequestParamsSchema.validate(req.params, { abortEarly: false })
        const { name, age } = await patchUserRequestBodySchema.validate(req.body, { abortEarly: false })
        const updatedUser = await userService.updateUser(id, name, age)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        if (error.message === "user id doesn't exist") {
            res.status(404).json({ message: "user id doesn't exist" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json(error.errors)
        }
        res.sendStatus(500)

    }
})

router.delete("/:id", async (req, res) => {
    try {
        // const { id } = req.params
        const { id } = await getUserByIdRequestParamsSchema.validate(req.params, { abortEarly: false })
        await userService.deleteUser(id)
        res.status(200).json({ message: "successfully deleted" })

    } catch (error) {
        console.log(error);
        if (error.message === "user doesn't exist") {
            res.status(404).json({ message: "user doesn't exist" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json(error.errors)
        }
        res.sendStatus(500)
    }
})

module.exports = router;

