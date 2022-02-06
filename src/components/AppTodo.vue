<template>
  <div>
    
    <form @submit.prevent="onSubmit">
      <div class="card" v-if="currentTodo">
        <div class="card-title">
          <span>{{ currentTodo.name }}</span>
          <div>
            <button type="submit" class="btn primary">Сохранить изменения</button>
            <span class="btn warning" @click="cancel">Отменить все</span>
            <span class="btn danger" @click="remove">Удалить заметку</span> 
          </div>
        </div>
        <hr>
        <div class="card-list">
          <div v-for="(item, index) in currentTodo.list" :key="index">
            <div>
            <input type="checkbox" 
              :id="`${currentTodo.id}-${index}`" 
              :checked="item.status" 
              @change="changeStatus(index)"
            >
            <span>
              <input type="text"
                v-model="item.listname"
                :disabled = "!item.editing" 
                :class="{completed: item.status}"
              />
            </span>
            <span>
              <div class="edititem action" @click.stop="editOne(index)" v-if="!item.editing">
                <img src="@/assets/edit-svgrepo-com.svg" alt="">
              </div>
              <div class="saveitem action" @click.stop="saveOne(index)" v-else>
                <img src="@/assets/save-technology-svgrepo-com.svg" alt="">
              </div>
            </span>
           
            
            <div class="removeitem action" @click.stop="removeOne(index)">
              &#10006;
            </div>
            </div>
          </div>    
        </div>

        <div class="form-control list-add" @click="addOne">
            <img src="@/assets/add-r-svgrepo-com.svg" alt="">
              <span>Добавить еще</span>
        </div>
       
        <div class="card-title row">
          <div class="form-control">
            <span class="button action" @click="cancelOne">
              <img src="@/assets/repeat-svgrepo-com.svg" alt="">
              <span>Отменить</span>
            </span>
            <span class="button action" @click="repeatOne">
              <img src="@/assets/repeat-svgrepo-com (1).svg" alt="">
              <span>Повторить</span>
            </span>
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
    todo: {},
    todos: [],
    currentIndex: 1
  }),
  mounted() {
    const todolist = JSON.parse(localStorage.getItem('todolist'))
    this.$store.commit('createList', todolist)
    this.todo = this.$store.getters.todo(this.$route.params.id)
    this.todo.list.map(item => item.editing = false)
    this.todos.push(this.todo)
    
  },
  watch: {
    currentTodo: function() {
      console.log(this.todos)
    }
  },
  computed: {
    size() {
      return this.todos.length
    },
    currentTodo() {
      return this.todos[this.size - this.currentIndex]
    },

  },
  methods: {
    newchange(fchange) {
      let nextChange = JSON.parse(JSON.stringify(this.todos[this.size - this.currentIndex]));
      fchange(nextChange)
      this.todos.push(nextChange)
    },
    onSubmit() {
      this.currentTodo.list.map(item => item.editing = false)
      this.$store.dispatch('save', this.currentTodo)
      if (localStorage.getItem('todolist')) {
        localStorage.removeItem('todolist')       
      }
      localStorage.setItem("todolist", JSON.stringify(this.$store.getters.todos));
      let instance = this.$toast.open({message: 'Заметка сохранена!', type: 'success'});
        setTimeout({
            function () {
              instance.dismiss();
            }
          },
          3000)
    },
    changeStatus(index) {
       this.newchange(function(obj){
         obj.list[index].status = !obj.list[index].status
       })
    },
    addOne() {
      this.newchange(function(obj){
         obj.list.push({
           listname: '',
            status: 0,
            editing: true
         })
       })
    },
    editOne(index) {
      this.newchange(function(obj) {
        obj.list[index].editing = !obj.list[index].editing
      })
    },
    saveOne(index) {
      
      this.editOne(index)
    },
    removeOne(index) {
      this.newchange(function(obj) {
        obj.list.splice(index, 1)
      })
     
    },
    remove() {
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
                this.$store.dispatch('remove', this.todo.id)
                if (localStorage.getItem('todolist')) {
                    localStorage.removeItem('todolist')       
                  }
                  localStorage.setItem("todolist", JSON.stringify(this.$store.getters.todos));
                this.$router.push('/')
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
      
    },
    cancelOne() {
      if (this.size > this.currentIndex) {
        this.currentIndex++
      }
      else {
        this.currentIndex = this.size
      }
    },
    repeatOne() {
      if (this.currentIndex > 1) {
        this.currentIndex--
      }
      else {
        this.currentIndex = 1
      }
    },
    cancel() {
       this.$confirm(
        {
          message: `Отменить все изменения?`,
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
                 this.todos.splice(1)
                  this.currentIndex = this.size
                }
            }
          }        
      )
     
    }
  }
}
</script>

<style>
.action {
  cursor: pointer;
}
.action img {
  width: 15px;
}
  .completed {
    text-decoration: line-through;
  }
  span.btn {
    font-size: 12px;
    display: inline-block;
  }
  .row {
    margin-top: 25px;
  }
  
  .edititem, .saveitem {
    position: absolute;
    right: -20px;
    cursor: pointer;
    z-index: 2;
    top: 0;
    color: red;
  }
  .removeitem {
    position: absolute;
    right: -40px;
    cursor: pointer;
    z-index: 2;
    top: 0;
    color: red;
  }
  .card-list > div > div {
    margin-bottom: 10px;
     position: relative;
  display: inline-block;
  }
  .button {
    margin-right: 15px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .button img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  img {
     display: inline-block;
     vertical-align: middle;
  }
  .list-add  img {
    width: 15px;
    height: 15px;
  }
  .list-add {
    margin-left: 3px;
    cursor: pointer;
  }
  .form-control span {
    padding-left: 5px;
  }
  input[type="text"] {
    display: inline-block;
    vertical-align: text-top;
  }
  input[disabled="disabled"] {
    background: none;
    border: 1px solid transparent;

  }
</style>