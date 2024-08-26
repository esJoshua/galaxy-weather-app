<template>
  <InputSearch @get-data-weather="handleGet" class="container mx-auto p-4 flex justify-center">
  </InputSearch>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router'

import InputSearch from '@/components/InputSearch.vue';

import { useWeatherStore } from '@/stores/weather'
import { requestUtil } from '@/utils/requestUtil';
import { useLocalStorage } from '@/utils/localStorage';

const router = useRouter()
const { getWeather } = useWeatherStore()
const { getLocalStorage } = useLocalStorage()

const loadingStates = reactive({
  getWeather: false,
  getForecast: false,
})

onMounted(() => {
  getLocalStorage("citiesHistory")
})

async function handleGet(inputCity: string) {
  await requestUtil({
    action: getWeather,
    payload: {
      params: {
        q: inputCity,
        lang: "es",
        units: "metric",
      }
    },
    resolve: () => {
      router.push('/weather')
    },
    reject: (err) => {
      console.log(err);
    },
    loader: (l) => {
      loadingStates.getWeather = l
    }
  })
}
</script>

