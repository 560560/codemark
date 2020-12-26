import axios from "axios"

const  API_KEY = "sG8R6NaHRqXI5dMx0B59iGF7JKDEvIFi"

let instance = axios.create({
    baseURL: `https://api.giphy.com/v1/gifs`
})

export const imagesAPI = {
    getImage(tag: string) {
        return instance.get(`random?api_key=${API_KEY}&tag=${tag}`)
    },
    getRandomImage() {
        return instance.get(`random?api_key=${API_KEY}`)
    },


}