window.addEventListener('load', ()=>{
  let temperatureDescription = document.querySelector(".temperature-description"),
      temperatureDegree = document.querySelector(".temperature-degree"),
      degreeSection = document.querySelector(".degree-section"),
      locationTimezone = document.querySelector(".location-timezone");
  const temperatureSpan = document.querySelector(".degree-section span"),
        searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value || "london");
    }
  }
  
  function getResults (cityName) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4dec43d1ac56c572a2969024b4efcd7a`;
      fetch(api)
        .then(weather => {
          return weather.json();
    }).then(displayResults);
  }
  
  function displayResults (weather) {
    let temp = weather.main.temp,
        icon = weather.weather[0].icon;
    /* displayResults */
    locationTimezone.textContent = `${weather.name},${weather.sys.country}`;
    temperatureDescription.textContent = `${weather.weather[0].description}`;
    temperatureDegree.textContent = `${weather.main.temp}`;
    /* formules */
        let faringheit = temp * (9/5) - 459.67,
            celsius = (faringheit - 32) * (5/9);
    /* set icon */
    setIcons(icon,document.querySelector(".icon"))
    /* change temperature */
    temperatureSpan.textContent = "K";
    degreeSection.onclick = () => {
        if(temperatureSpan.textContent === "K"){
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = Math.floor(faringheit);
        }else if(temperatureSpan.textContent === "F"){
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
        }else{
            temperatureSpan.textContent = "K";
            temperatureDegree.textContent = temp;
        }
    }

    function setIcons (icon,iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = "a" + icon;
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
  }
});