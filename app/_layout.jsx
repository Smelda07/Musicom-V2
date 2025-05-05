import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import GlobalProvider from "../context/GlobalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({// set font weight for it when using by google fonts numbers 
    Roboto: require('../assets/fonts/Roboto.ttf'), 
    OpenSans: require("../assets/fonts/OpenSans.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false}} />
            <Stack.Screen name="(auth)" options={{ headerShown: false}} />
            <Stack.Screen name="(pretabs)" options={{ headerShown: false}} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
    </GlobalProvider>
  );
}
