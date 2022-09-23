import axios from "axios"


export const apifetch = axios.create({
    baseURL: "https://api-organizable.herokuapp.com"
    ,
})