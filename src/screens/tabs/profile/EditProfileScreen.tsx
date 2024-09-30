import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import Avatar from "@/src/components/Avatar";
import { Input } from "react-native-elements";
import Button from "@/src/components/Button";
import { set } from "lodash";

export default function EditProfileScreen() {
  const [loading, setLoading] = useState(false);
  const { getUserProfile, signOut, updateUserProfile } = useSupabaseAuth();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

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
  //       setFullName(data.full_name);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function handleUpdateProfile() {
    setLoading(true);
    try {
      const { error } = await updateUserProfile(username, fullName, avatarUrl);

      if (error) {
        setLoading(false);
        Alert.alert(`Profile Update Failed ${error}`);
      } else {
        Alert.alert("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     if (session) {
  //       handleGetProfile();
  //     }
  //   }, [session])
  // );
  return (
    <SafeAreaView className="bg-white flex-1">
      <View>
        <View className="flex-row items-center justify-between px-4">
          <View className="w-1/3">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View className="border-2 border-neutral-500 h-10 w-10 p-2 rounded-full items-center justify-center">
                <ChevronLeftIcon size={30} strokeWidth={3} color="gray" />
              </View>
            </Pressable>
          </View>
          <View className="w-1/3">
            <Text className="text-xl font-bold">Edit Profile</Text>
          </View>
          <View className="w-1/3"></View>
        </View>
        <View>
          <View className="justify-center items-center py-2">
            <View className="overflow-hidden border-2 rounded-3xl border-[#2ab07c]">
              <Avatar
                size={100}
                url={avatarUrl}
                showUpload={true}
                onUpload={(newUrl: string) => {
                  console.log("Avatar yüklendi:", newUrl);
                  setAvatarUrl(newUrl); // Yeni avatar URL'sini güncelle
                }}
              />
            </View>
            <View className="w-full py-3 items-center">
              <Text className="text-lg font-bold text-white">{username}</Text>
            </View>
          </View>
        </View>
        <View className="px-4">
          <View>
            <Input label="Email" value={session?.user?.email} disabled />
          </View>
          <View className="space-x-1">
            <Input
              label="Username"
              value={username || ""}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View className="space-x-1">
            <Input
              label="Fullname"
              value={fullName || ""}
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          <Button
            title={loading ? <ActivityIndicator color="white" /> : "Update"}
            action={() => handleUpdateProfile()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
