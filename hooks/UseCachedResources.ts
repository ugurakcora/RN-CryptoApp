import * as font from "expo-font";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await font.loadAsync({
          PlusJakartaSans: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
          PlusJakartaSansBold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
          PlusJakartaSansItalic: require("../assets/fonts/PlusJakartaSans-Italic.ttf"),
          PlusJakartaSansBoldItalic: require("../assets/fonts/PlusJakartaSans-BoldItalic.ttf"),
          PlusJakartaSansMedium: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
          PlusJakartaSansMediumItalic: require("../assets/fonts/PlusJakartaSans-MediumItalic.ttf"),
          PlusJakartaSansSemiBold: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
          PlusJakartaSansSemiBoldItalic: require("../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf"),
          PlusJakartaSansExtraBold: require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
          PlusJakartaSansExtraBoldItalic: require("../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf"),
          PlusJakartaSansExtraLight: require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
          PlusJakartaSansExtraLightItalic: require("../assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf"),
          PlusJakartaSansLight: require("../assets/fonts/PlusJakartaSans-Light.ttf"),
          ...FontAwesome.font,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);
  return isLoadingComplete;
}
