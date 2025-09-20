const express = require("express");
const userService = require('../service/user')
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const { name, email, age } = req.body
        const newUser = await userService.addUser(name, email, age)
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error);
        if (error.message === "duplicate email id") {
            res.status(400).json({ message: "Email id already exist" })
        }

        res.status(500)
    }
})

router.get("/:id", async (req, res) => {
    try {

        const { id } = req.params
        const user = await userService.getUserById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        if (error.message === "user doesn't exist") {
            res.status(404).json({ message: "user doesn't exist" })
        }
        res.status(500)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { name, age } = req.body
        const updatedUser = await userService.updateUser(id, name, age)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        if (error.message === "user id doesn't exist") {
            res.status(404).json({ message: "user id doesn't exist" })
        }
        res.status(500)

    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        await userService.deleteUser(id)
        res.status(200).json({ message: "successfully deleted" })

    } catch (error) {
        console.log(error);
        if (error.message === "user doesn't exist") {
            res.status(404).json({ message: "user doesn't exist" })
        }
        res.status(500)
    }
})

module.exports = router;

