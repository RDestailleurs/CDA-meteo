import  { s } from './Container.style'
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import fond from "../../assets/fond.jpg";

export function Container({ children }) {
  return (
    <ImageBackground
      source={fond}
      style={s.img_background}
      imageStyle={s.img}
    >
      <SafeAreaView style={s.container}>{children}</SafeAreaView>
    </ImageBackground>
  );
}