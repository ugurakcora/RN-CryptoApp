import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { SearchCoin } from "@/utils/cryptoapi";
import { debounce } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
import numeral from "numeral";

interface Coin {
  uuid: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: string;
  change: number;
  marketCap: string;
}

const blurhash = "L5H2EC=PM+yV0g-mq.wG9c010J}I";

export default function SearchScreen() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>([]);

  console.log(results);

  const { navigate }: NavigationProp<SeachNavigationType> = useNavigation();
  const { navigate: navigateHome }: NavigationProp<HomeNavigationType> =
    useNavigation();

  const renderItem = ({ item, index }: { item: Coin; index: number }) => {
    return (
      <Pressable
        className="flex-row w-full py-4 items-center px-4"
        onPress={() => navigate("CoinDetails", { coinUuid: item.uuid })}
        key={item.uuid}
      >
        <Animated.View
          entering={FadeInDown.duration(100)
            .delay(index * 200)
            .springify()}
          className="w-full flex-row items-center"
        >
          <View className="w-[16%]">
            <View className="w-10 h-10 ">
              <Image
                source={{ uri: item.iconUrl }}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
                className="w-full h-full flex-1"
              />
            </View>
          </View>
          <View className="w-[55%] justify-start items-start">
            <Text className="font-bold text-lg">{item.name}</Text>
            <View className="flex-row justify-center items-center space-x-2">
              <Text className="font-medium text-sm text-neutral-500">
                {numeral(parseFloat(item?.price)).format("$0,0.00")}
              </Text>
            </View>
          </View>
          <View className="w-[29%] justify-start items-end">
            <Text className="font-bold text-base">{item.symbol}</Text>
            <View className="flex-row justify-center items-center space-x-2">
              <Text className="font-medium text-sm text-neutral-500">
                {item?.marketCap && item?.marketCap?.length > 9
                  ? item.marketCap.slice(0, 9)
                  : item.marketCap || "N/A"}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery && searchQuery.length > 2) {
      setLoading(true);
      try {
        const results = await SearchCoin(searchQuery);
        if (results) {
          setResults(results);
        }
      } catch (error) {
        console.log(error);
        setResults([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="w-full flex-row justify-between items-center px-4 pb-4 ">
        <View className="w-3/4 flex-row space-x-2">
          <Text className="text-3xl font-bold">Search</Text>
        </View>
      </View>
      <View className="mx-4 mb-3 flex-row p-2 border-2 justify-between items-center bg-white rounded-lg shadow-sm">
        <TextInput
          placeholder="Search for a coin"
          placeholderTextColor="gray"
          className="flex-1 pl-2 font-medium text-black tracking-wider"
          onChangeText={handleTextDebounce}
        />
        <Pressable
          onPress={() => {
            navigateHome("HomeS");
          }}
        >
          <XMarkIcon size="25" color="black" />
        </Pressable>
      </View>
      <View className="mt-4">
        {loading ? (
          <View>
            <ActivityIndicator size="large" color="#164bd8" />
          </View>
        ) : (
          <FlatList
            data={results?.data?.coins}
            keyExtractor={(item) => item.uuid}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
