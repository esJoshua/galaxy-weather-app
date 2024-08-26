import axios from 'axios'
const apiWeather =
  axios.create({
    baseURL: import.meta.env.VITE_URL_BASE
  })
  
  
apiWeather.interceptors.request.use(function (config) {
  config.params = { ...config.params, apiKey: import.meta.env.VITE_API_KEY }
  return config
})

export { apiWeather }