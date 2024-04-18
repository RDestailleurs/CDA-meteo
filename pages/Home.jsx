import { s } from './Home.style'
import { Text, View } from 'react-native'
import { MeteoAPI } from '../api/meteo';
//gestion localisation
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
//useEffect et useState
import { useEffect, useState } from 'react';
import { Txt } from '../components/Txt';
import { MeteoAdvanced } from '../MeteoAdvanced/MeteoAdvanced';
import { MeteoBasic } from '../components/MeteoBasic/MeteoBasic';
import { getWeatherInterpretation } from '../components/services/meteo-services';
export function Home () {
    const [coords, setCoords] = useState();
    const [weather, setWeather] = useState();
    const currentWeather = weather?.current_weather;
    const [city, setCity] = useState();
    
    async function getUserCoords() {
        
    
        let {status } = await requestForegroundPermissionsAsync();
        if (status === "granted") {
            const location = (await getCurrentPositionAsync());
            if(location !== undefined){
                setCoords({lat: location.coords.latitude, lng : location.coords.longitude});
            }

        }else {
            setCoords({lat:"48.85", lng: "2.35"});
        }
    }
   
    async function fetchWeather(coordinates){
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coordinates);
        console.log(weatherResponse);
        setWeather(weatherResponse);

    }
    async function fetchCity(coordinates){
        const cityResponse = await MeteoAPI.fetchCityFromCoords(coordinates);
        setCity(cityResponse);
    }
    useEffect(() => {
        getUserCoords();
    },[]);
    useEffect(() => {
        if (coords) {
            fetchWeather(coords)
            fetchCity(coords)
        }
    }, [coords]);

    console.log(currentWeather);
    console.log(currentWeather?.temperature);
    return (
        currentWeather?
        <>
            <View style={s.meteo_basic}>
            <MeteoBasic
                temperature = {Math.round(currentWeather?.temperature)}
                city = {city}
                interpretation = {getWeatherInterpretation(currentWeather.weathercode)}
                />
            </View>
            <View style={s.searchbar}></View>
            <View style={s.meteo_advanced}>
                <MeteoAdvanced
                    wind={currentWeather.windspeed}
                    dusk = {weather.daily.sunrise[0].split("T")[1]}
                    dawn={weather.daily.sunset[0].split("T")[1]}
                />
            </View>
        </>
        : null
    )
}