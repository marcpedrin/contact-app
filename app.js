// importing all packages
const express  = require('express')
const  mongoose  = require('mongoose')
const router = require('./routes/router')
// const methodOverride = require('method-override')

const methodOverride = require('method-override')

const app = express()
const PORT = 9000

// using packages

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/', router)

//database connection

const conection = async () => {
   await mongoose.connect('mongodb+srv://marc:mnap1012@contacts.fg26t.mongodb.net/Contact-List-App?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connected to DB')
  };
conection();

// routes


// app.get('/', (req,res) =>{
//     res.render('index')
// })

// app.get('/update', (req,res) =>{
//     res.render('update')
// })

// app.get('/create', (req,res) =>{
//     res.render('create')
// })

//port

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})