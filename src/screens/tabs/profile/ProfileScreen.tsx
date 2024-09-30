import { View, Text, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import { useUserStore } from "@/store/useUserStore";
import Avatar from "@/src/components/Avatar";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const { getUserProfile, signOut } = useSupabaseAuth();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const { session } = useUserStore();
  const navigation = useNavigation();

  // async function handleGetProfile() {
  //   setLoading(true);
  //   try {
  //     const { data, error, status } = await getUserProfile();
  //     if (error && status !== 406) {
  //       setLoading(false);
  //       throw error;
  //     }
  //     if (data) {
  //       setUsername(data.username);
  //       setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // useFocusEffect(
  //   useCallback(() => {
  //     if (session) {
  //       handleGetProfile();
  //     }
  //   }, [session])
  // );

  async function handleSignOut() {
    await signOut();
  }
  return (
    <View className="flex-1 bg-white">
      <View>
        <View className="border justify-center items-center py-14 pb-20 bg-[#2ab07c]">
          <View className="overflow-hidden border-2 border-white rounded-3xl">
            <Avatar size={100} url={avatarUrl} />
          </View>
          <View className="w-full py-3 items-center">
            <Text className="text-lg font-bold text-white">{username}</Text>
          </View>
        </View>
        <View
          className="bg-white px-4 py-6 -mt-11"
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text className="text-lg font-bold pb-2">Account Overview</Text>
        </View>
        <View className="p-2 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 my-3 mx-2">
          <Pressable
            className="flex-row justify-between items-center"
            onPress={() => navigation.navigate("EditProfileS")}
          >
            <View className="flex-row justify-center items-center space-x-2 ">
              <View className="bg-[#2ab07c] p-1 rounded-lg">
                <MaterialIcons name="person-4" size={24} color="white" />
              </View>
              <Text className="text-lg text-gray-600 font-semibold">
                Edit My Profile
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
          </Pressable>
        </View>
        <View className="p-2 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 my-3 mx-2">
          <Pressable className="flex-row justify-between items-center">
            <View className="flex-row justify-center items-center space-x-2 ">
              <View className="bg-[#2ab07c] p-1 rounded-lg">
                <MaterialIcons name="password" size={24} color="white" />
              </View>
              <Text className="text-lg text-gray-600 font-semibold">
                Change Password
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
          </Pressable>
        </View>
        <View className="p-2 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 my-3 mx-2">
          <Pressable
            className="flex-row justify-between items-center"
            onPress={() => handleSignOut()}
          >
            <View className="flex-row justify-center items-center space-x-2 ">
              <View className="bg-[#2ab07c] p-1 rounded-lg">
                <MaterialIcons name="logout" size={24} color="white" />
              </View>
              <Text className="text-lg text-gray-600 font-semibold">
                Log Out
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
