<template>
 <div>
    <the-navbar />

    <div class="container with-nav">
     
      <div class="todolist">
        <div v-for="(todo, index) in todos" :key="index">
          <div class="card">
            <div class="card-title">{{ todo.name }}</div>   
          </div>
        </div>
      </div><!-- /.todolist -->
    </div>
   </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue';

export default {
  
  name: "Home",
  data: () => ({
    todos: []
  }),
  mounted() {
    this.todos = this.$store.getters.todos
  },
  components: {TheNavbar}
};
</script>

<style scoped>
  .todolist {
    margin: 20px 0;
  }
  

</style>
