<template>
 <div>
    <TheNavbar />
    <div class="container with-nav">
        <AppTodolist />
    </div>
   </div>
</template>

<script>
import AppTodolist from '../components/AppTodolist.vue';
import TheNavbar from '../components/TheNavbar.vue';

export default {
  
  name: "Home",
  data: () => ({
  
  }),
 
  components: {TheNavbar, AppTodolist}
};
</script>

<style >
  .card-title span {
    font-weight: bold;
  }
  .todolist {
    margin: 20px 0;
  }
  .card-content {
    
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    margin-top: 15px;
  }

</style>
