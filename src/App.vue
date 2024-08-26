<script setup lang="ts">
import TheFooter from './components/TheFooter.vue';
import TheNavbar from './components/TheNavbar.vue'

</script>

<template>
  <div class="grid-container">

    <TheNavbar />

    <main class="bg-white flex w-full justify-center">
      <RouterView />
    </main>

    <TheFooter />

  </div>

</template>

<style scoped></style>
