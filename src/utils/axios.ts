import axios from "axios";

const apiURL = axios.create({
    baseURL: "https://restcountries.com/v3.1",
});

export default apiURL;