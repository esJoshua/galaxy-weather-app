<template>

    <div class="hero min-h-screen">
        <div class="hero-content bg-slate-100 border rounded-md shadow-xl flex-col lg:flex-row">
            <div class="flex justify-center items-center p-6 text-black">
                <div class="flex flex-col items-center">
                    <h1 class="text-6xl font-bold">{{ datos?.location }}</h1>
                    <img :src=datos?.image alt="Estado del Clima" class="w-52 h-52" />
                    <p>{{ datos.description }}</p>
                </div>

                <div>
                    <p class="text-3xl text-center">
                        {{ datos?.temperature }}°C
                    </p>
                    <div class="text-lg mt-2">
                        <div class="inline-flex p-2">
                            <strong>&#8595;</strong> {{ datos?.tempMin }}°C
                        </div>

                        <div class="inline-flex p-2">
                            <strong>&#8593;</strong> {{ datos?.tempMax }}°C
                        </div>
                    </div>
                </div>
            </div>
            <div>

                <div v-for="dato in datos.col2" :key="dato.label"
                    class="flex items-center border-b border-gray-200 py-4">
                    <p class="text-lg text-black">
                        <strong>{{ dato?.label }}</strong> {{ dato?.value ?? "Sin Información" }}
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useWeatherStore } from '@/stores/weather'

const router = useRouter()
const weatherStore = useWeatherStore()
const { weatherData } = storeToRefs(weatherStore)

interface WeatherData {
  location: string;
  description: string;
  temperature: number;
  tempMax: number;
  tempMin: number;
  image: string;
  col2: { label: string; value: string }[];
}

const datos = ref<WeatherData>({
  location: '',
  description: '',
  temperature: 0,
  tempMax: 0,
  tempMin: 0,
  image: '',
  col2: [],
});

const setData = () => {
    if (!weatherData.value) {
        router.push('/')
        return
    }        
    const { name, weather, main, visibility, wind } = weatherData.value
    datos.value = {
        location: name,
        description: weather[0].description,
        temperature: main.temp,
        tempMax: main.temp_max,
        tempMin: main.temp_min,
        image: `http://openweathermap.org/img/w/${weather[0].icon}.png`,

        col2: [
            { label: "Presión Atmosférica:", value: main.pressure + " hPa" },
            { label: "Humedad Relativa:", value: main.humidity + "%" },
            { label: "Visibilidad:", value: visibility / 1000 + " km" },
            { label: "Viento:", value: wind.speed + " m/s" }
        ]
    }
}
watchEffect(() => setData())



</script>
