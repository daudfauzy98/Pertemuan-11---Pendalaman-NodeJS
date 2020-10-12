import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { iniDatabase, iniTable, insertProduct } from './database.js'

const __dirname = path.resolve()
const app = express()
const db = iniDatabase()
iniTable(db)

//app.set('view engine', 'hbs')
app.set('views', __dirname + '/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// Log incoming request
app.use(morgan('combined'))

// Parse request body
app.use(bodyParser.urlencoded({ extended: false}))

// Serve static filess
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', (req, res, next) => {
    res.send({ success: true })
})

//Get product list
app.get('/product', (req, res, nexxt) => {
    res.render('product')
})

// Handle from GET method
app.get('/add-product', (req, res, next) => {
    res.send(req.query)
})

// Handle from POST method
app.post('/add-product', (req, res, next) => {
    console.log('Request', req.body)
    insertProduct(db, req.body.name, parseInt(req.body.price), '-')
    //res.send(req.body)
    res.redirect('/product')
})

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.listen(8000, () => {
    console.log('App listen on port 8000')
})