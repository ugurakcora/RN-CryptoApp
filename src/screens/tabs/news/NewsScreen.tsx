import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { FetchCryptoNews } from "@/utils/cryptoapi";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { format, parse } from "date-fns";
import { BookmarkSquareIcon } from "react-native-heroicons/outline";

export default function NewsScreen() {
  const { data: NewsData, isLoading: IsNewsLoading } = useQuery({
    queryKey: ["cryptonews"],
    queryFn: FetchCryptoNews,
  });

  const navigation = useNavigation();

  const formatDate = (dateString: string) => {
    const parsedDate = parse(
      dateString,
      "EEE, dd MMM yyyy HH:mm:ss X",
      new Date()
    );
    return format(parsedDate, "MMM dd yyyy");
  };

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => {
          handleClick(item);
        }}
      >
        <View className="flex-row justify-start w-[100%] shadow-sm">
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{ uri: item.thumbnail }}
              style={{
                width: hp(9),
                height: hp(10),
              }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>
          <View className="w-[70%] pl-4 justify-center space-y-1">
            <Text className="text-xs font-bold text-gray-900">
              {item?.description?.length > 20
                ? item?.description?.slice(0, 20) + "..."
                : item?.description}
            </Text>
            <Text className="text-neutral-800 capitalize max-w-[90%]">
              {item?.title?.length > 50
                ? item?.title?.slice(0, 50) + "..."
                : item?.title}
            </Text>
            <Text className="text-xs text-gray-700">
              {formatDate(item?.createdAt)}
            </Text>
          </View>
          <View className="w-[10%] justify-center">
            <BookmarkSquareIcon color="gray" />
          </View>
        </View>
      </Pressable>
    );
  };

  //dark:bg-neutral-500
  return (
    <SafeAreaView className="space-y-2 bg-white flex-1">
      <View className="w-full flex-row justify-between items-center px-4 pb-4">
        <View className="w-3/4 flex-row space-x-2">
          <Text className="text-3xl font-bold">Crypto News</Text>
        </View>
      </View>
      <View>
        {NewsData && NewsData.data?.length > 0 ? (
          <FlatList
            data={NewsData.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <View>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
