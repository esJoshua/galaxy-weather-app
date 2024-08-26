<template>
    <div class="navbar bg-info">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <ul class="p-2">
                        <details>
                            <summary>Historial</summary>
                            <ul class="p-1">
                                <li class="p-2 cursor-pointer flex flex-row align-middle" v-for="city in cities"
                                    :key="city">
                                    <p @click="getDataWeather(city)">{{ city }}</p>
                                    <button class="btn-xs btn-square btn-outline" @click="handleDelete(city)">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </ul>
                </ul>
            </div>
            <ul class="menu menu-horizontal px-1 hidden lg:flex">
                <li class="text-black">
                    <RouterLink to="/"><strong>Home</strong> </RouterLink>
                </li>
                <li>
                    <details>
                        <summary class="text-black"><strong>Historial</strong></summary>
                        <ul class="p-2">
                            <li v-for="city in cities" :key="city"
                                class="p-1 cursor-pointer grid grid-flow-col align-middle place-content-between">
                                <p @click="getDataWeather(city)">{{ city }}</p>
                                <button class="btn-xs btn-square btn-outline flex place-self-center"
                                    @click="handleDelete(city)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
        <div class="navbar-center">
            <a class="text-white text-xl">{{ tittle }}</a>
        </div>
        <div class="navbar-end max-md:hidden" :class="handleInvisibleClass">
            <div class="form-control">
                <input v-model.trim="input.city" type="text" placeholder="Ciudad"
                    @keyup.enter="getDataWeather(input.city)" class="input input-bordered w-24 md:w-auto" />
            </div>
            <div class="dropdown dropdown-end">
                <div role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="iconPlus" :src="iconPlus" @click="getDataWeather(input.city)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import iconPlus from '@/components/icons/IconPlus.png'
import { requestUtil } from '@/utils/requestUtil';
import { useWeatherStore } from '@/stores/weather'
import { useLocalStorage } from '@/utils/localStorage';


const router = useRouter()
const route = useRoute()

const weatherStore = useWeatherStore()
const { cities } = storeToRefs(weatherStore)
const { getWeather } = useWeatherStore()

const { deleteLocalStorage } = useLocalStorage()

const tittle = "MyWeather App"

const loadingStates = reactive({
    getWeather: false,
})

const input = reactive({
    city: '',
    error: ''
})

async function getDataWeather(inputCity: string) {
    if (inputCity.length === 0) {
        return
    }
    await requestUtil({
        action: getWeather,
        payload: {
            params: {
                q: inputCity.toUpperCase(),
                lang: "es",
                units: "metric",
            }
        },
        resolve: () => {
            router.push('/weather')
            input.city = ''
        },
        reject: (err) => {
            input.city = ''
            console.log(err);
        },
        loader: (l) => {
            loadingStates.getWeather = l
        }
    })
}

const handleDelete = (city: string) => {
    deleteLocalStorage("citiesHistory", city)
}   

const handleInvisibleClass = computed(() => {
    return route.name === 'home'
        ? "invisible"
        : "visible"
})  
</script>
