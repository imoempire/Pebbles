import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigatorContainer from "./src/Navigator/appRouter";
import {
  useFonts,
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  let [fontsLoaded] = useFonts({
    ExtraLight: Oswald_200ExtraLight,
    Light: Oswald_300Light,
    Regular: Oswald_400Regular,
    Medium: Oswald_500Medium,
    SemiBold: Oswald_600SemiBold,
    Bold: Oswald_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <AppNavigatorContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
