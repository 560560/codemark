import * as axios from "axios"

const  API_KEY = "gTJAO48YcpmrADUyo4opy4ES4g7iDBxx"

let instance = axios.create({
    baseURL: `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=`
})

export const imagesAPI = {
    getImage(tag) {
        return instance.get(`${tag}`)
    }

}