const request =  require('request')



const forecast =(langitude , logitude, callback) => 
{ 
    const url ='http://api.weatherstack.com/current?access_key=eb22e4bda2c33827d4a62a0b26faab00&query=' + langitude + ',' + logitude + '&units=m'
    request({url , json :true }, (error,{body})=>{
            if (error)
            {
                callback (error, undefined)
            }
            else if  (body.error) {
                callback('cannot find location', undefined)

            }
            else 
            {
                callback (undefined, {
                    weather_is : body.current.weather_descriptions[0],
                    temperature : body.current.temperature,
                    feelslike :body.current.feelslike
                })
            }
    })

}
module.exports =forecast;