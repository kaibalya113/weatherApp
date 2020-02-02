window.addEventListener('load', ()=>{
    let lang;
    let lat;
    let tempDescription= document.querySelector('.description');
    let tempDegree = document.querySelector('.degree');
    let locationTimeZone = document.querySelector('.time-zone');
    let temo = document.querySelector(".degree-section");
    let tempSpan = document.querySelector(".degree-section span")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {
            // console.log(position)
            lang = position.coords.longitude
            lat = position.coords.latitude
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api= `${proxy}https://api.darksky.net/forecast/f918a37512eebb5593acee4a059b903c/${lat},${lang}`;
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data)
                const {temperature, summary} = data.currently;
                // set dom element from api
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;
                // add to celsius
                let celsius = (temperature -32)*(5/9);
                // Set Icon
                const data1 = data.hourly;
                let isnos = data1.icon;
                icons(isnos, document.querySelector(".icon"));

                /// change temperature farenheit to celsius
                temo.addEventListener('click', () =>{
                    if(tempSpan.textContent == "F"){
                        tempSpan.textContent = "C";
                        tempDegree.textContent= Math.floor(celsius);
                    }else{
                        tempDegree.textContent= temperature;
                        tempSpan.textContent = "F";
                    }
                })
            })
        });
        
    }
    function icons(icon, iconId){
        const skycon = new Skycons({color: "white"});
        const currentIcon =icon.replace("-", "_").toUpperCase(); // "/-/g" this is also use 
        skycon.play();
        return skycon.set(iconId, Skycons[currentIcon]);
    }

})