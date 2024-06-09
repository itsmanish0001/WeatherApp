import React, { useState } from 'react'
import "../App.css"
import { DarkMode, Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const Second = () => {

  const {darkMode} = useSelector((state)=>state.data);

  const [city, setCity] = useState("");
  const [showCity, setShowCity] = useState(false);

  const [country, setCountry] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [temp, setTemp] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weather, setWeather] = useState("");



  const searchHandler = async(e) =>{
    e.preventDefault();
    console.log(city);
    const toastId = toast.loading("Searching...");

    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fa3590a7dc611269ca43afbaedaf16d3`);
    const result = await response.json();
    console.log(result);
    if(result.cod != 200){
      toast.error(result.message, {id:toastId});
      setCity("");
      setCountry("");
      setHumidity("");
      setPressure("");
      setShowCity(false);
      setTemp("");
      setWeather("");
      setWindDirection("");
      setWindSpeed("");
      
      return;
    }
    setShowCity(true);
      setCountry(result.sys.country);
      setHumidity(result.main.humidity);
      setPressure(result.main.pressure);
      setWeather(result.weather[0].description);
      let a = String(result.main.temp - 273.15);
      setTemp(a.substring(0, 6));
      setWindDirection(result.wind.deg);
      setWindSpeed(result.wind.speed);
      toast.success("Fetched Successfully...", {id:toastId});


    }
    catch(error){
      console.log(error);
      toast.error(error);

    }



  }
  
  return (
    <div className='second' style={{backgroundColor:darkMode?"black":"white", color:darkMode?"white":"black"}} >
      <h2 style={{textAlign:"center", border:"2px solid green"}}>Search For Another Location</h2>
      <div style={{
        display:"flex",
        justifyContent:"center"
      }} >
          <form onSubmit={searchHandler} style={{width:"90%"}} > 
          <input type='text' style={{width:"80%", height:"35px", marginLeft:"8%"}} value={city} onChange={(e)=>setCity(e.target.value)} />
          <IconButton type="submit" >
          <Search color="info" size="large" />
          </IconButton>
          </form >
      </div>

      { showCity && <h2 style={{textAlign:"center"}}>{city}</h2>}

      <table className ="styled-table">
    <tbody>
      <tr>
        <td>Country Code</td>
        <td>{country}</td>
      </tr>
      <tr>
        <td>Wind Speed</td>
        <td> {windSpeed} </td>
      </tr>
      <tr>
        <td>Wind Direction</td>
        <td> {windDirection} </td>
      </tr>
      <tr>
        <td>Temperature</td>
        <td> {temp} </td>
      </tr>
      <tr>
        <td>Pressure</td>
        <td> {pressure} </td>
      </tr>
      <tr>
        <td>Humidity</td>
        <td> {humidity} </td>
      </tr>
      <tr>
        <td>Weather</td>
        <td> {weather} </td>
      </tr>
    </tbody>
  </table>

    </div>
  )
}

export default Second
