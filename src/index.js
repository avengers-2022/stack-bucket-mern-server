require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express();
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Hello World!!!'
    })
})

app.use((req, res, next) => {
    const error = new Error('404 Server Error!!!')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    console.log(error);
    if (error.status == 404) {
        return res.status(404).json({
            msg: error.message,
            status: 404
        })
    }

    return res.status(500).json({
        msg: 'SERVER ERROR!!!',
        status: 500
    })
})


app.listen(process.env.PORT, () => {
    console.log('SERVER IS LISTNING PORT:', process.env.PORT);
})