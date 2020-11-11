console.log('client side js file');



fetch('http://localhost:3000/weather?address=12stunt').then((response)=>{
    response.json().then((data)=> {
        if (data.error)
        {
            console.log(data.error);
        }
        else{
            console.log(data.forcast);
        }
    })
})