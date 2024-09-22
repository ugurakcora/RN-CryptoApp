import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import Button from "@/src/components/Button";
import ButtonOutline from "@/src/components/ButtonOutline";
import Breaker from "@/src/components/Breaker";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const blurhash = "L5H2EC=PM+yV0g-mq.wG9c010J}I";
  const { navigate: navigateAuth }: NavigationProp<AuthNavigationType> =
    useNavigation();
  return (
    <SafeAreaView className="flex-1 justify-between items-center bg-white">
      <StatusBar style="auto" />
      <View className="w-full px-4 items-center justify-center space-y-6 h-full">
        <View className="w-full px-4 items-center">
          <Animated.View
            entering={FadeInRight.duration(100).delay(100).springify()}
            className="flex-row justify-center items-center"
          >
            <View>
              <View className="w-20 h-20 overlow-hidden">
                <Image
                  source={require("../../../assets/images/logo.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
            </View>
          </Animated.View>
        </View>
        <View className="justify-center items-center">
          <Animated.Text
            entering={FadeInDown.duration(100).delay(100).springify()}
            className="text-neutral-800 text-3xl font-medium leading-[60px]"
            style={{
              fontFamily: "PlusJakartaSansBold",
            }}
          >
            Welcome
          </Animated.Text>
        </View>

        <View className="w-full justify-start">
          <Animated.View
            entering={FadeInDown.duration(100).delay(300).springify()}
            className="pb-6"
          >
            <Button title="Login" action={() => navigateAuth("Login")} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(100).delay(400).springify()}
          >
            <ButtonOutline
              title="Sign Up"
              action={() => navigateAuth("Register")}
            />
          </Animated.View>
        </View>
        <View>
          <Breaker />
        </View>
        <View className="w-full justify-normal">
          <Animated.View
            entering={FadeInDown.duration(100).delay(600).springify()}
            className="border-white pb-4"
          >
            <ButtonOutline title="Continue with Google">
              <AntDesign name="google" size={20} color="gray" />
            </ButtonOutline>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(100).delay(700).springify()}
            className="border-white pb-4"
          >
            <ButtonOutline title="Continue with Google">
              <AntDesign name="apple1" size={20} color="gray" />
            </ButtonOutline>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}
