const request=require('request')
const forecast=(latitude,longitude,callback) => {
const url='http://api.weatherstack.com/current?access_key=c42326d1f86ce5cce261fec576a8e302&query=' + latitude + ',' + longitude + '&units=f'
request({url, json:true},(error,{body}) =>{
  if(error){
callback('unable to connect service',undefined)
  } 
  else if (body.error){
    callback('unable to fins location',undefined)
  } 
  else{
callback(undefined, body.current.weather_descriptions[0] + "it is currently " + body.current.temperature + "degress out,there is a " + body.current.feelslike +  '%CHANCE OF RAIN')
  }
})
}

module.exports = forecast