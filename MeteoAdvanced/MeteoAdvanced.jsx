import { s } from "./MeteoAdvanced.style";
import { View, Txt } from "react-native"
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