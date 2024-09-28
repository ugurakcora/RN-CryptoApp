import { View, Text } from "react-native";
import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import MarketScreen from "../../tabs/market/MarketScreen";

const Stack = createStackNavigator();

export default function MarketNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="MarketS" component={MarketScreen} />
    </Stack.Navigator>
  );
}
