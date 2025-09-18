const userRouter = require('./controller/user')
const express = require('express')
const app = express()
const port = 4000

app.use(express.json())

app.get('/livecheck', (req, res) => {
    res.send('Up')
})

app.use('/user', userRouter)

app.listen(port, (err) => {
    if (err) {
        console.log("error is:", err);
    } else {

        console.log(`Facebook app listening on port ${port}`)
    }
})