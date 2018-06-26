const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day-sunny",
  "Snow": "wi wi-day-snow",
  "mist": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet"
}
function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

function formatTemp(Temp){
  return Temp[0] + Temp[1]
}
async function main(withIP = true){

  let ville;
  if(withIP){
    const ip = await fetch('https://api.ipify.org?format=json')
      .then(resultat => resultat.json())
      .then(json => json.ip)

    ville = await fetch('https://freegeoip.net/json/' + ip)
      .then(resultat => resultat.json())
      .then(json => json.city)
  }
  else{
    ville = document.querySelector('#ville').textContent;
  }


  const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&lang=fr&appid=1c482730a9b364b0f37f01afe50f4cec`)
    .then(resultat => resultat.json())
    .then(json => json)
  console.log(meteo)
  displayWeatherInfos(meteo);
}


function displayWeatherInfos(data){
  const name = data.name;
  const temperature = data.main.temp;
  const conditions = data.weather[0].main;
  const description = data.weather[0].description;
  const ApproximateTemp = Math.round(temperature -273,15 );

  document.querySelector('#ville').textContent = name;
  document.querySelector('#temperature').textContent = ApproximateTemp;
  document.querySelector('#conditions').textContent = capitalize(description);
  document.querySelector('i.wi').className = weatherIcons[conditions]

  document.body.className = conditions.toLowerCase();
}

ville.addEventListener('click', () =>{
  ville.contentEditable =  true;
});

ville.addEventListener('keydown', (e) => {
  if(e.keyCode === 13){
    e.preventDefault();
    ville.contentEditable = false;
    main(false);
  }
})

main();
