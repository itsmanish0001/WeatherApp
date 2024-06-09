import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city:"",
    country:"",
    wind_speed:"",
    wind_dir:"",
    temp:"",
    pressure:"",
    humidity:"",
    weather:"",
    darkMode:true,
    mobileMenu:false,
}

const fetchedDataSlice = createSlice({
    name:"data",
    initialState,
    reducers:{
        setCity:(state, action) => {
            state.city = action.payload;
        },
        setCountry:(state, action) => {
            state.country = action.payload;
        },
        setWindSpeed:(state, action) => {
            state.wind_speed = action.payload;
        },
        setWindDir:(state, action) => {
            state.wind_dir = action.payload;
        },
        setTemp:(state, action) => {
            state.temp = action.payload;
        },
        setPressure:(state, action) => {
            state.pressure = action.payload;
        },
        setHumidity:(state, action) => {
            state.humidity = action.payload;
        },
        setWeather:(state, action) => {
            state.weather = action.payload;
        },
        setDarkMode:(state, action) => {
            state.darkMode = action.payload;
        },
        setMobileMenu:(state, action) => {
            state.mobileMenu = action.payload;
        }
    }
})


export default fetchedDataSlice;
export const {setCity, setCountry, setDarkMode, setHumidity, setPressure, setTemp, setWeather, setWindDir, setWindSpeed, setMobileMenu } = fetchedDataSlice.actions;

