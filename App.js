import { Home } from './pages/Home';

import AlataRegular from "./assets/fonts/Alata-Regular.ttf";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Forecast } from './pages/Forecast/Forecast';
export default function App() {
  const [isFontLoaded] = useFonts({
    "Alatar-Regular":AlataRegular,
  });
  const Stack = createNativeStackNavigator();
  const navTheme = {
    colors: {
      background: "transparent",
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
            {isFontLoaded ? (
              <Stack.Navigator
                screenOptions={{ headerShown: false}}
                initialRouteName="Home">
                    <Stack.Screen name = "Home" component={Home}/>
                    <Stack.Screen name = "Forecast" component={Forecast}/>
                </Stack.Navigator>
            ) : null}
    </NavigationContainer>
  );
}
;
