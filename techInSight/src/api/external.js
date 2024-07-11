import axios from "axios";
const NEW_API_ENDPOINT =`https://newsapi.org/v2/everything?q=technology&sortBy=published&apiKey=08c203dc594345f49ed975da18826889`;
//const NEW_API_ENDPOINT=`https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json`;
const crypto_api ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en';
export const getNews = async () =>{
    let response;
    try {
        response = await axios.get(NEW_API_ENDPOINT);
         response = response.data.articles.slice(0, 25)
    } catch (error) {
        console.log(error);
        return error;
    }
    return response;
}
export const getCrypto = async () =>{
    let response;
    try {
        response = await axios.get(crypto_api);
         response = response.data;

    } catch (error) {
        console.log(error);
        return error;
    }
    return response;
}
