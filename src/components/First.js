import React, { useEffect, useState } from 'react'
import "../App.css"
import Clock from "react-live-clock";
import { useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import first_bg from "../abc.jpg";
import first_light from "../first_light.jpg"

const First = () => {

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const [date, setDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const a = dateBuilder(date);
    console.log(a);
    setDate(a);
  }, [])

  
  let {darkMode, city, country, wind_speed, wind_dir, temp, pressure,humidity, weather} = useSelector((state)=> state.data);
  temp = String(temp);
  


  return (
    <div className='first' style={{backgroundImage: darkMode? `url(${first_bg})`: `url(${first_light})`,
                                    color:darkMode?"white":"black",
    }}>
      <Stack spacing={"2rem"} direction={"column"}>
      <Typography className='typo' variant="h4"> {date} </Typography>
      <Typography className='typo' variant='h4'>{city}, {country}</Typography>
      <Typography className='typo' variant='h3'> <Clock className='clock' format="HH:mm:ss" interval={1000} ticking={true} style={{fontWeight:"bolder", fontSize:"60px"}}/>
      </Typography>
      <Typography className='typo' variant='h3'> Temperature -  {temp.substring(0,5)}' </Typography>
      <Typography className='typo' variant='h4'> {weather} </Typography>
      <Typography className='typo' variant='h5'> Pressure - {pressure} </Typography>
      <Typography className='typo' variant='h5'> Humidity - {humidity} </Typography>
      
      
      </Stack>
    </div>
  )
}

export default First
