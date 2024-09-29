import {
  XRapidAPIHost,
  XRapidAPIKey,
  XRapidAPIHostNews,
  XRapidAPIKeyNews,
} from "./api";
import axios from "axios";

const apiBaseUri = "https://coinranking1.p.rapidapi.com";
const coinsUri = `${apiBaseUri}/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0`;
const newsUrl = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk";
const CryptoApiCall = async (endpoints, params = {}) => {
  const options = {
    method: "GET",
    url: endpoints,
    params,
    headers: {
      "X-RapidAPI-Key": XRapidAPIKey,
      "X-RapidAPI-Host": XRapidAPIHost, // Tam domain adı
    },
  };

  try {
    const response = await axios.request(options);
    console.log("response", response);

    return response.data;
  } catch (error) {
    console.error("API call failed:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    return {};
  }
};

const NewsApiCall = async (endpoints) => {
  const options = {
    method: "GET",
    url: endpoints,
    headers: {
      "X-RapidAPI-Key": XRapidAPIKeyNews,
      "X-RapidAPI-Host": XRapidAPIHostNews,
    },
  };

  try {
    const response = await axios.request(options);
    console.log("response", response);

    return response.data;
  } catch (error) {
    console.error("API call failed:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    return {};
  }
};

export const FetchAllCoins = async () => {
  return await CryptoApiCall(coinsUri);
};

export const FetchCoinDetails = async (coinUuId) => {
  const coinDetailsUri = `${apiBaseUri}/coin/${coinUuId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
  return await CryptoApiCall(coinDetailsUri);
};

export const FetchCoinHistory = async (coinUuId) => {
  const coinHistoryUri = `${apiBaseUri}/coin/${coinUuId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
  return await CryptoApiCall(coinHistoryUri);
};

export const SearchCoin = async (searchQuery) => {
  const searchUri = `${apiBaseUri}/search-suggestions?query=${searchQuery}&referenceCurrencyUuid=yhjMzLPhuIDl&`;
  return await CryptoApiCall(searchUri);
};

export const FetchCryptoNews = async () => {
  console.log("newsUrl", newsUrl);

  return await NewsApiCall(newsUrl);
};
