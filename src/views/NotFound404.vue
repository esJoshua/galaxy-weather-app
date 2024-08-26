<template>
  <section class="grid text-center justify-center">
    <p class="text-lg md:text-5xl text-black self-end">{{ notFoundMessage }}</p>
    <p class="text-base md:text-lg text-black"> {{ redirectionMessage }}</p>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const { notFoundMessage, redirectionMessage } = {
  notFoundMessage: '404 Página No Encontrada',
  redirectionMessage : 'Será redirigido al home...'
} 

setTimeout(() => {
  router.push('/')
}, 3000)

</script>

