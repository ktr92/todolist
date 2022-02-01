<template>
  <div>
    <form>
      <div class="card" v-if="todo">
        <div class="card-title">
          {{ todo.name }}
        </div>
        <div class="card-list">
          <div v-for="(item, index) in todo.list" :key="index">
            {{ item.listname }}
            <input type="checkbox" :id="item."><label for=""></label>
          </div>    
        </div><!-- /.card-list -->
      </div>
      <div v-else>
        <div class="card">Такой заметки нет</div><!-- /.card -->
      </div>
    </form>
   </div>
</template>

<script>

export default {
  data: () => ({
    todo: {}
  }),
  mounted() {
    this.todo = this.$store.getters.todo(this.$route.params.id)
  }
}
</script>

<style>

</style>