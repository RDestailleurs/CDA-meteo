import { s } from './Home.style'
import { Alert, Text, View } from 'react-native'
import { MeteoAPI } from '../api/meteo';
//gestion localisation
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
//useEffect et useState
import { useEffect, useState } from 'react';
import { Txt } from '../components/Txt';
import { MeteoAdvanced } from '../MeteoAdvanced/MeteoAdvanced';
import { MeteoBasic } from '../components/MeteoBasic/MeteoBasic';
import { getWeatherInterpretation } from '../components/services/meteo-services';
import { useNavigation } from '@react-navigation/native';
import { Container } from '../components/Container/Container';
import { SearchBar } from '../components/SearchBar/SearchBar';
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
        setWeather(weatherResponse);

    }
    async function fetchCoordsByCity(city) {
        try {
            const coords = await MeteoAPI.fetchCoordsFromCity(city);
            setCoords(coords);
        }
        catch (e) {
            Alert.alert("Désoler",e)
        }
    }
    async function fetchCity(coordinates){
        const cityResponse = await MeteoAPI.fetchCityFromCoords(coordinates);
        setCity(cityResponse);
    }
    const nav= useNavigation();
    function goToForecastPage(){
        nav.navigate("Forecast",{city, ...weather.daily});
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

    return (
        currentWeather?
        <Container>
            <View style={s.meteo_basic}>
            <MeteoBasic
                temperature = {Math.round(currentWeather?.temperature)}
                city = {city}
                interpretation = {getWeatherInterpretation(currentWeather.weathercode)}
                onPress={goToForecastPage}
                />
            </View>
            <View style={s.searchbar}>
                <SearchBar onSubmit={fetchCoordsByCity}/>
            </View>
            <View style={s.meteo_advanced}>
                <MeteoAdvanced
                    wind={currentWeather.windspeed}
                    dusk = {weather.daily.sunrise[0].split("T")[1]}
                    dawn={weather.daily.sunset[0].split("T")[1]}
                />
            </View>
        </Container>
        : null
    )
}