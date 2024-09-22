import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Image } from "expo-image";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function SplashScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { navigate }: NavigationProp<SplasNavigationType> = useNavigation();

  const blurhash = "L5H2EC=PM+yV0g-mq.wG9c010J}I";
  useEffect(() => {
    setTimeout(() => {
      navigate("Welcome");
    }, 2000);
  }, []);
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <StatusBar style="auto" />
      <View className="w-full px-4 items-center">
        <View>
          <Animated.View
            className="flex-row justify-center items-center"
            entering={FadeInRight.duration(100).springify()}
          >
            <View className="pr-2 ">
              <View className="w-20 h-20 overflow-hidden">
                <Image
                  source={require("../../../assets/images/logo.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={100}
                  className="w-full h-full flex-1"
                />
              </View>
            </View>
          </Animated.View>
          <Animated.View
            className="flex-row justify-center items-center"
            entering={FadeInRight.duration(100).delay(200).springify()}
          >
            <Text
              className="text-neutral-600 text-xl leading-[60px] pl-1"
              style={{
                fontFamily: "PlusJakartaSansBold",
              }}
            >
              AKCORA
            </Text>
            <Text
              className="text-[#31aca3] text-xl leading-[60px] pl-1"
              style={{
                fontFamily: "PlusJakartaSansItalic",
              }}
            >
              CRYPTO
            </Text>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}
