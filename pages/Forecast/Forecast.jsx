import { s } from "./Forecast.style"
import { Txt } from "../../components/Txt"
import { Container } from "../../components/Container/Container"
import { TouchableOpacity, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { ForecastListItem } from "../../components/ForecastListItem/ForecastListItem"
import { getWeatherInterpretation } from "../../components/services/meteo-services"
import { DAYS, dateToDDMM } from "../../components/services/date-services"
export function Forecast ({}) {
    const {params} = useRoute();
    const nav = useNavigation();
    const backButton = (
        <TouchableOpacity style={s.back_btn} onPress={()=> nav.goBack()}>
            <Txt>{"<"}</Txt>
        </TouchableOpacity>
    )
    console.log(params.city);
    const header = (
        <View style = {s.header}>
            {backButton}
            <View style={s.header_texts}>
                <Txt>{params.city}</Txt>
                <Txt style={s.subtitle}>Prévision sur 7 jours</Txt>
            </View>
        </View>
    )
    const forecastList = (
        <View style={s.forecastList}>
            {
                params.time.map( (time,index) => {
                    const code= params.weathercode[index];
                    const image= getWeatherInterpretation(code).image;
                    const date = new Date(time);
                    const day = DAYS [new Date(time).getDay()];
                    const temperature = params.temperature_2m_max[index]
                    return <ForecastListItem 
                        image={image}
                        day={ day }
                        key={time}
                        date= { dateToDDMM(date) }
                        temperature={ temperature.toFixed(0) }
                        />
                })
            }
        </View>
    )
    return (
    <Container>
        { header }
        <View style= {{marginTop : 50}}>
            { forecastList }
        </View>
    </Container>
    );
}