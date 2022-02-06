<template>
  <div>
    <div class="todolist">
        <div v-for="(todo, index) in todos" :key="index">
          <div class="card">
            <div class="card-title">
              <span>{{ todo.name }}</span>
              <span>
                <button class="btn primary" @click="$router.push(todo.id)">Открыть</button>
                <button class="btn danger" @click="remove(todo.id)">Удалить</button>
              </span>
            </div>   
            <div class="card-content">
              <div v-for="(item, index) in todo.list" :key="index"  v-show="index < 3">
                <span :class="{completed: item.status}">{{ item.listname }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
   data: () => ({
   /*  todos: [] */
  }),
  mounted() {
    if (localStorage.getItem('todolist')) {
      const todolist = JSON.parse(localStorage.getItem('todolist'))
      this.$store.commit('createList', todolist)     
    }
    else {
      this.$store.setItem('todolist', JSON.stringify(this.$store.getters.todos))
    }
  },
  methods: {
    remove(id) {
      this.$confirm(
        {
          message: `Удалить заметку?`,
          button: {
            no: 'Нет',
            yes: 'Да'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm 
          */
          callback: confirm => {
            if (confirm) {
                this.$store.dispatch('remove', id)

                // уведомления можно реализовать через новый компонент или вынести в state
                // однако все же в данном случае упростим (хотя у нас появляется повторение кода) 
                // но т.к. нет требования про уведомлениям, не будем тратить на это время сейчас
                let instance = this.$toast.open({message: 'Заметка удалена!', type: 'warning'});
                setTimeout({
                    function () {
                      instance.dismiss();
                    }
                  },
                  3000)
                }
            }
          }        
      )
    }
  },
  computed: {
    todos() {
      return this.$store.getters.todos
    } 
  }
}
</script>

<style>

</style>