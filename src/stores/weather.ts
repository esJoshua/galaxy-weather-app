import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiWeather, apiIcon } from '@/config/axios'
import { useLocalStorage } from '@/utils/localStorage'
import type { paramsPath } from '@/types'
import type { WeatherResponse } from '@/interfaces/weather.response'
import type { ForecastResponse } from '@/interfaces/forecast.response'

export const useWeatherStore = defineStore('weatherStore', () => {
  const { setLocalStorage } = useLocalStorage()
  const weatherData = ref<WeatherResponse  | undefined>()
  const forecastData = ref<ForecastResponse[]>([])
  const iconId = ref<string>("")
  const cities = ref<string[]>([])

  async function getWeather(payload: paramsPath) {
    try {
      const { params } = payload
      const { data } = await apiWeather.get<WeatherResponse>('weather', { params })
      checkCity(params.q)
      weatherData.value = data
      return Promise.resolve(data)
      
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async function getForecast(payload: paramsPath) {
    try {
      const { params } = payload
      const { data } = await apiWeather.get<ForecastResponse[]>('forecast', { params })
      forecastData.value = data
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async function getIcon() {
    try {
      if (iconId.value === '') return
      const { data } = await apiIcon.get(`${iconId.value}.png`)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  const checkCity = (city: string) => {
    if (!cities.value.includes(city)) {
      cities.value.push(city)
      setLocalStorage('citiesHistory', cities.value)
    }
  }

  return {
    weatherData,
    forecastData,
    getWeather,
    getForecast,
    getIcon,
    cities
  }
})
