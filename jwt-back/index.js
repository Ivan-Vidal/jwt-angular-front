const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const useRoutes = require("./controllers/user")



const routes = require('./routes/routes')

app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

app.use(express.json())

app.use('/api', routes)

app.listen(8000)