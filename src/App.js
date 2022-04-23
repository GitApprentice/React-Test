import React, { useState } from 'react';
import './App.css';


const api = {
  key: '8af5e1f5d91fe8dfa40bc3b1f807e201',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');

  const search = event => {
    if (event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          setCondition(result.weather[0].main);
          setLocation(result.timezone);

          console.log(result);  
        })
        .catch(() => {
          alert('Please enter city name & spell correctly');
        }); 
    }
  } 

 const formatDate = () => {
    let d = new Date();
    let utcOffset = d.getTimezoneOffset();
    d.setMinutes(d.getMinutes() + utcOffset);

    let cityOffset = location / 60;
    d.setMinutes(d.getMinutes() + cityOffset);

    return d.toDateString(); 
  }

  return (
    <div className = {
        (condition === 'Clear' || condition === 'Sunny') ? 'app sunny'
      : (condition === 'Clouds' || condition === 'Cloudy') ? 'app cloudy' 
      : (condition === 'Rain') ? 'app rainy'
      : (condition === 'Mist' || condition === 'Fog' || condition === 'Haze') ? 'app overcast'
      : (condition === 'Snow') ? 'app snowy'
      : 'app default'
    }>   
      <main>
        <div className="search-box">
          <input 
            type='text'
            className='search-bar'
            placeholder='Enter City...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className='data-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date' style={{fontSize: '18px'}}>{formatDate()}</div>
            <div className='temp'>
              {Math.round(weather.main.temp)}°F
            </div>
            <div className='weather'>
              {weather.weather[0].main}
            </div>
          </div>
        </div>  
        ) : ('')}    
      </main>
    </div>    
  ) 
}

export default App;

 



