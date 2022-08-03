const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')
const homeRoutes = require('./routes/home')
const catsRoutes = require('./routes/cats')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')

const app = express()

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/add',addRoutes)
app.use('/',homeRoutes)
app.use('/cats',catsRoutes)
app.use('/card',cardRoutes)

const PORT = process.env.PORT || 3000

async function start(){
    try{
        const url = 'mongodb://uovjs8v8yrud6ebwkkjh:NgwqalhD1bxUKABQO11i@bm4e67ynmjaqi7d-mongodb.services.clever-cloud.com:27017/bm4e67ynmjaqi7d'
        await mongoose.connect(url, {useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`server is runnin on port: ${PORT}`)
        })
    } catch(e){
        console.log(e)
    }
    
}

start()

