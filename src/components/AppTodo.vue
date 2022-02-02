<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="card" v-if="todo">
        <div class="card-title">
          <span>{{ todo.name }}</span>
          <div>
            <span type="submit" class="btn primary">Сохранить заметку</span>
            <span class="btn warning" @click="cancel">Отменить все</span>
            <span class="btn danger" @click="remove">Удалить заметку</span> 
          </div>
        </div>
        <hr>
        <div class="card-list">
          <div v-for="(item, index) in todo.list" :key="index">
            <div>
            <input type="checkbox" 
              :id="`${todo.id}-${index}`" 
              :checked="item.status" 
              v-model="item.status"
            >
            <label 
              :for="`${todo.id}-${index}`" 
              :class="{completed: item.status}"
            >
                {{ item.listname }}
            </label>
            <div class="removeitem" @click.stop="removeOne">
              &#10006;
            </div>
            </div>
          </div>    
        </div>
       
        <div class="card-title row">
          <div class="form-control">
            <span class="btn warning" @click="cancelOne">Отменить изменение</span>
            <span class="btn" @click="repeatOne">Повторить измененное</span>
          </div>
          
        </div>

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
    /* todo: {} */
  }),
  mounted() {
    /* this.todo = this.$store.getters.todo(this.$route.params.id) */
  },
  computed: {
    todo() {
      return this.$store.getters.todo(this.$route.params.id)
    }
  },
  methods: {
    onSubmit() {
      
    },
    removeOne() {

    },
    remove() {

    },
    cancelOne() {

    },
    repeatOne() {

    },
    cancel() {

    }
  }
}
</script>

<style>
  .completed {
    text-decoration: line-through;
  }
  span.btn {
    font-size: 12px;
    display: inline-block;
  }
  .row {
    margin-top: 15px;
  }
  

  .removeitem {
    position: absolute;
    right: -20px;
    cursor: pointer;
    z-index: 2;
    top: 0;
    color: red;
  }
  .card-list > div > div {
    margin-bottom: 5px;
     position: relative;
  display: inline-block;
  }
</style>