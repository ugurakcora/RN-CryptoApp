import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { SearchCoin } from "@/utils/cryptoapi";
import { debounce } from "lodash";

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
  const [results, setResults] = useState([]);
  const { navigate }: NavigationProp<HomeNavigationType> = useNavigation();
  const { navigate: navigateHome }: NavigationProp<HomeNavigationType> =
    useNavigation();

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery && searchQuery.length > 3) {
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
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
}
