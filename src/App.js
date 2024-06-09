/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { IconButton } from '@mui/material';
import './App.css';
import Main from './components/Main';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useCallback, useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { setDarkMode, setCity, setCountry, setHumidity, setPressure, setTemp, setWeather, setWindDir, setWindSpeed, setMobileMenu} from './Redux/reducers/FetchedData';
import SearchDialog from './components/SearchDialog';
import app_background_dark from "./bgImage.jpg";
import app_background_light from "./light_bg.webp";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';


function App() {

  
  const dispatch = useDispatch();
  const {darkMode, city, country, wind_speed, wind_dir, temp, pressure,humidity, weather, mobileMenu} = useSelector((state)=> state.data);



  const getCurrentLocation = useCallback(async()=> {
    
    const toastId = toast.loading("Accessing Your Location..");
    if ("geolocation" in navigator) {
      
      await navigator.geolocation.getCurrentPosition(
        
        function (position) {

          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          toast.success("Location Accessed Successfully...", {id:toastId});
          fetchData(latitude, longitude);
          
        },
       
        function (error) {
          console.error("Error getting current position:", error.message);
          toast.error("Can't able to access Your Location", {id:toastId});
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.", {id:toastId});
    }
  },[])

  
  const fetchData = async(latitude, longitude) =>{
    const toastId = toast.loading("Fetching Your Current Location's Data");
      console.log("fd", latitude, longitude);
      let a = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fa3590a7dc611269ca43afbaedaf16d3`);
      let response = await a.json();
      console.log(response);
  
      const city = response.name;
      const country = response.sys.country;
      const wind_speed = response.wind.speed;
      const wind_dir = response.wind.deg;
      const temp = response.main.temp - 273.15;
      const pressure = response.main.pressure;
      const humidity = response.main.humidity;
      const weather = response.weather[0].description;

      dispatch(setCity(city));
      dispatch(setCountry(country));
      dispatch(setHumidity(humidity));
      dispatch(setPressure(pressure));
      dispatch(setTemp(temp));
      dispatch(setWeather(weather));
      dispatch(setWindDir(wind_dir));
      dispatch(setWindSpeed(wind_speed));
  
      // console.log(city, wind_dir, country, wind_speed, temp, pressure, humidity, weather);
      console.log(typeof(temp), "type");

      toast.success("Data successfully Fetched", {id:toastId})
    

  }




  

  useEffect(()=>{
    
    getCurrentLocation();
    
    

    
  },[])

  
  
 

  return (
    <div className="App" style={{backgroundImage: darkMode? `url(${app_background_dark})`: `url(${app_background_light})`}}>


      <div className='mode' onClick={()=>{dispatch(setDarkMode(!darkMode))}}>
        
          <IconButton color="inherit" size='large'>
          {darkMode? <LightModeIcon/>:<DarkModeIcon/>}
          </IconButton>
        
      </div>



      <div className='menu'>
        <IconButton onClick={()=>dispatch(setMobileMenu(true))} color='inherit' size='large'>
          <MenuIcon />
        </IconButton>
      </div>




      <Main />

      {mobileMenu && <SearchDialog/>}

      <Toaster position='bottom-center'/>

    </div>

    


  );

}



export default App;
