<template>

  <div class="container with-nav">
    <TheNavbar />
    <AppTodo />    
  </div>
</template>

<script>
import AppTodo from '../components/AppTodo.vue'
import TheNavbar from '../components/TheNavbar.vue'
export default {
  components: { AppTodo, TheNavbar },
  name: "Todo"
}
</script>

<style>

</style>