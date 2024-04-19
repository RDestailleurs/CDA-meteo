import { s } from "./MeteoAdvanced.style";
import { View } from "react-native";
import { Txt } from "../components/Txt";
export function MeteoAdvanced({dusk, down, wind}){

    return (
        <View style={s.container}>
            <View style={{alignItems: "center"}}>
                <Txt style={{fontSize: 20}}>{dusk}</Txt>
                <Txt style={{fontSize: 15}}>Aube</Txt>
            </View>
            <View style={{alignItems: "center"}}>
                <Txt style={{fontSize: 20}}>{down}</Txt>
                <Txt style={{fontSize: 15}}>Crépuscule</Txt>
            </View>
            <View style={{alignItems: "center"}}>
                <Txt style={{fontSize: 20}}>{wind}</Txt>
                <Txt style={{fontSize: 15}}>Vent</Txt>
            </View>
        </View>
    )
}