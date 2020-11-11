const request =  require('request')

const geocode=(address,callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)  + '.json?access_token=pk.eyJ1IjoibmFuc2hhcmRhNDgiLCJhIjoiY2toN20xeHJkMG45cDJwbnprM203bnZ1NCJ9.nnIdNpNIveBIvzm0l6YtbQ&limit=1'

    request({url, json :true }, (error='',{body} = {})=>{
       if (error)
       {
         callback('unable to connect', undefined)
       }
       else if (body.features.length == 0)
       {
         callback('place not found', undefined)
       } 
       else{
        callback(undefined,{
            latitude :body.features[0].center[1] ,
            longitude: body.features[0].center[0],
            location : body.features[0].place_name
           })
       
       }
        
        
    })



}

module.exports =geocode;



