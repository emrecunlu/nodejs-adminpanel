const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const morgan = require('morgan')
const multer = require('multer')
const { flash} = require('express-flash-message')
const adminRoutes = require('./routes/adminRoutes')
const slugify = require('slugify')
const path = require('path')
const app = express()

// env file reader
dotenv.config()

// database connection with mongo
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(3000))
.catch(err => console.log(err))

// set theme engine
app.set('view engine', 'ejs')

// bodyparser settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// set static folder
app.use(express.static('public'))

// callback request props
app.use(morgan('tiny'))

// set flashmessage settings
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60
    },
}))
app.use(flash({ sessionKeyName: 'flashMessage' }));

// multer settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, slugify(file.originalname))
    }
})
const upload = multer({ storage})

// admin routes
app.use(express.static(path.join(__dirname, 'public/admin')))
app.use('/admin', upload.single('file'), adminRoutes)
