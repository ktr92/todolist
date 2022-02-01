<template>
  <nav class="navbar">
    <h3>Заметки</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Главная</router-link>
      </li>
     
      <li>
        <a href="#" @click.prevent="create">Создать новую</a>
      </li>
      
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    create() {
      this.$router.push('/new')
    }
  }
  
}
</script>

<style>

</style>