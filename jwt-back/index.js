const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const routes = require('./routes/routes')
const app = express()

//     mongoose.connect('mongodb+srv://Cluster77183:eWJ5bmFoR3Bm@cluster77183.ujj50fl.mongodb.net/?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

app.use(express.json())

app.use('/api', routes)

app.listen(8000)