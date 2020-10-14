window.addEventListener('load', ()=>{
    let long,
        lat,
        temperatureDescription = document.querySelector(".temperature-description"),
        temperatureDegree = document.querySelector(".temperature-degree"),
        degreeSection = document.querySelector(".degree-section"),
        locationTimezone = document.querySelector(".location-timezone");
    const temperatureSpan = document.querySelector(".degree-section span");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4dec43d1ac56c572a2969024b4efcd7a`;
            fetch(api)
            .then(response =>{
                return response.json();
            })  
            .then(data =>{
                const {temp} = data.main,
                      city = data.name,
                      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
                      {main,description,icon} = data.weather[0];
                /* set DOM elements */
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = timezone
                /* formules */
                    let faringheit = temp * (9/5) - 459.67,
                        celsius = (faringheit - 32) * (5/9);
                /* set icon */
                setIcons(icon,document.querySelector(".icon"))
                /* change temperature */
                degreeSection.addEventListener('click',() =>{
                    if(temperatureSpan.textContent === "K"){
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(faringheit)
                    }else if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius)
                    }else{
                        temperatureSpan.textContent = "K";
                        temperatureDegree.textContent = temp
                    }
                })
            });
        });
    }

    function setIcons (icon,iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = "a" + icon;
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});