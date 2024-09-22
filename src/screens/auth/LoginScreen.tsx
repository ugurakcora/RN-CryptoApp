import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import React, { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  return (
    <View className="flex-1">
      {isloading && (
        <View className="absolute z-50 h-full w-full justify-center items-center">
          <View
            className="h-full w-full justify-center items-center bg-black opacity-[0.45]
          "
          ></View>
          <View className="absolute">
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      )}

      <View className="justify-center items-center relative flex-1">
        <View
          className="justify-center w-full px-4 space-y-4"
          style={{
            height: height * 0.75,
          }}
        >
          <Animated.View
            className="justify-center items-center"
            entering={FadeInDown.duration(100).springify()}
          >
            <Text
              className="text-neutral-800 text-2xl leading-[60px]"
              style={{
                fontFamily: "PlusJakartaSansBold",
              }}
            >
              Welcome Back, User
            </Text>
            <Text className="text-neutral-500 text-sm font-medium">
              Welcome Back! Please enter your details.
            </Text>
          </Animated.View>
          <Animated.View></Animated.View>
        </View>
      </View>
    </View>
  );
}
