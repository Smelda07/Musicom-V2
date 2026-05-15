import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import "../global.css";
import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto.ttf'), 
    OpenSans: require("../assets/fonts/OpenSans.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          {/* Hlavní stránka */}
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* Auth flow */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          {/* Před taby (např. onboarding) */}
          <Stack.Screen name="(pretabs)" options={{ headerShown: false }} />

          {/* Hlavní taby */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Podstránky */}
          <Stack.Screen name="(subpages)/add/BandPage" options={{ headerShown: false }} />
          <Stack.Screen name="(subpages)/add/EventPage" options={{ headerShown: false }} />
          <Stack.Screen name="(subpages)/add/GearPage" options={{ headerShown: false }} />
           <Stack.Screen name="(subpages)/add/MusicianPage" options={{ headerShown: false }} />
          <Stack.Screen name="(subpages)/add/TrackPage" options={{ headerShown: false }} />

          {/* Not found page */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GlobalProvider>
  );
}
