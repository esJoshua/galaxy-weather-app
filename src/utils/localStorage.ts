import { useWeatherStore } from '@/stores/weather'
import { storeToRefs } from 'pinia'

export const useLocalStorage = () => {

  const weatherStore = useWeatherStore()
  const { cities } = storeToRefs(weatherStore)
  
  const setLocalStorage = (keyName: string, data: string[]) => {
    localStorage.setItem(keyName, JSON.stringify(data))
  }
  const getLocalStorage = (keyName: string) => {
    const cache = localStorage.getItem(keyName)
    if (cache) cities.value = JSON.parse(cache)
    return cities.value
  }
  const deleteLocalStorage = (keyName: string, keyValue: string) => {
    localStorage.removeItem(keyName) 
    const citiesUpdated = cities.value.filter((city) => city !== keyValue)
    cities.value = [...citiesUpdated]
    setLocalStorage(keyName, citiesUpdated)
    return cities.value
  }

  return { setLocalStorage, getLocalStorage, deleteLocalStorage }
}
