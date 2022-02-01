import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [{
        id: '001',
        name: 'Сделать задание по VUE',
        list: [{
            listname: 'Изучить техзадание',
            status: 1
          },
          {
            listname: 'Сделать верстку',
            status: 0
          },
          {
            listname: 'Сделать функционал',
            status: 0
          },
        ]
      },
      {
        id: '002',
        name: 'Прочитать книгу',
        list: [{
            listname: 'Купить книгу',
            status: 0
          },
          {
            listname: 'Начать чтение',
            status: 0
          },
          {
            listname: 'Завершить чтение',
            status: 0
          },
        ]
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    todos: state => state.todos,
    todo: (state) => (id) => state.todos.filter(todo => todo.id == id)[0]
  }
});