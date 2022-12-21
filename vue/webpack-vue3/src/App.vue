<template>
  <div>hellow world everyone</div>
  <h1>{{name}}</h1>
</template>

<script setup lang="ts">
import '@/assets/index.less'
import { ref } from 'vue'
const name = ref<string>('liudehua')
</script>

<style scoped>

</style>