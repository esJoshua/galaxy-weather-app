<template>
    <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text">Como esta el clima en </span>
            <span class="label-text-alt"></span>
        </div>
        <input type="text" v-model.trim="input.city" @keyup.enter="handleGetDataWeather" placeholder="Nombre de la ciudad"
            class="input input-bordered w-full max-w-xs" />
        <span class="label-text-alt text-red-700"> {{ input.error }}</span>
        <button @click="handleGetDataWeather" class="btn btn-info mt-5">Buscar</button>
    </label>

</template>


<script lang="ts" setup>

import { reactive } from 'vue'

const emit = defineEmits(['get-data-weather']);

const input = reactive({
    city: '',
    error: ''
})

const handleGetDataWeather = () => {
    input.error = ''
    if (input.city.length === 0 ) {
        input.error = '**Debe ingresar un nombre valido**'
        return
    }
    emit('get-data-weather', input.city.toUpperCase());
    input.city = ''
}

</script>
