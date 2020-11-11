const path = require('path')
const express = require('express')
const hbs = require('hbs')
const  geocode =  require('./utils/geocode.js')
const forecast =  require('./utils/forcast.js')

const app = express()
const port= process.env.PORT || 3000
// define paths for Express config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewspath =path.join(__dirname,'../templets/views')
const partialsPath =path.join(__dirname,'../templets/partials')

// set up handelbar engine  and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
    title: 'home',
    name: 'Andrew Mead'
    })
   })
   
 

   app.get('/about', (req, res) => {
    res.render('about', {
    title: 'About ',
    name: 'Andrew Mead'
    })
   })


   app.get('/help', (req, res) => {
    res.render('help', {
    title: 'help',
    name: 'Andrew Mead'
    })
   })


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'address not set' 
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} ={}) => {
        if (error){
            return res.send({ error })
        }
         forecast( latitude,  longitude, (error, dataforcast) => {
            if (error){
                return res.send({
                    error
                    })
                }
                 res.send({
                    forcatst :dataforcast,
                    location : location,
                   
                })
            })
        
        })
   
   })

   app.get('/help/*', (req, res) => {
    res.send('404  help page not found')
   })


   app.get('*', (req, res) => {
    res.send('404 page not found')
   })


app.listen(port, ()=>{
    console.log('server is running on 3000');
})