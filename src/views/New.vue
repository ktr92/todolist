<template>
  <div>
    <the-navbar />
      <div class="container with-nav">
        <div class="card">
          <div class="card-title">Создать заметку</div>
          <hr>
          <form @submit.prevent="onSubmit">
            <div class="form-control">
              <label>Введите название заметки</label>
              <input type="text" v-model="newname">
            </div>
            <div class="form-control">
              <label>Добавьте пункты</label>
              
                <ul>
                <li class="form-control" v-for="(todotext, index) in todotexts" :key="index">
                  <label>
                    <input type="text" v-model="todotext.listname">
                  </label>
                </li>
                </ul>
             
              
              <div class="card-title"> 
                <span class="btn" @click="addCount">Добавить пункт</span>
                <button type="submit" class="btn primary" >Создать заметку</button>
              </div>
             
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'


export default {
  components: { TheNavbar },
  data: () => ({
    count: 1,
    newname: '',
    todotexts: [
      {
        listname: '',
        status: 0
      }
    ]
  }),
  methods: {
    addCount() {
      this.todotexts.push({})
    },
    onSubmit() {
      // можно сделать валидацию, но я сделал минимальную проверку, 
      // которую можно доработать при необходимости
      if ((this.newname!="")) {
        const newtodo = {} // передаваемый объект = новая заметка
        newtodo.name = this.newname
        newtodo.list = this.todotexts

        // для упрощения id = количество секунд с 1 января 1970 года .
        newtodo.id = new Date().getTime().toString()
        this.$store.dispatch('addnew', newtodo)

        this.newname = ""
        this.todotexts = [{listname: '', status: 0}]
         this.$savedata('todolist', this.$store.getters.todos)  
        let instance = this.$toast.open('Заметка добавлена!');
        setTimeout({
            function () {
              instance.dismiss();
            }
          },
          3000)
        }
    }
  },
 

}
</script>

<style>

</style>