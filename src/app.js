const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
//define paths for express config
const publicd=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


//setup handlebars engine viewsand location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//setup sataic directory to serve
app.use(express.static(publicd))

app.get('',(req,res)=>
{
    res.render('index',{
       title:'weather ',
       name:'ajmal'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'about me',
        name:'ajmal'
    })
      
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'mwoluse jaada aano',
       title:'helpo',
       name:'ajmal majeed'
    })
      
})

app.get('/weather',(req,res) =>
{
    if(!req.query.address){
return res.send({
    error:'u must provide an address'
})
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
if(error)
{
    return res.send({error})
}
forecast(latitude,longitude,(error,forecastdata)=>
{
if(error)
{
    return res.send({error})
}
res.send({
    forecast:forecastdata,
    location,
    address:req.query.address
})
})
    })

})





app.get('/products',(req,res)=>
{if(!req.query.search){
return res.send({
    error:'you must provide a search term'
})
}
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>
{
res.render('404',{
    title:'404',
    name:'ajmal majeed',
     errormessage:'help  mwonuse not found.'
})
})

app.get('*',(req,res)=>
{
res.render('404',{
   title:'404',
   name:'ajmal majeed',
    errormessage:'page not found.'
})
})
app.listen(3000,()=>
{
    console.log('server is up')
})