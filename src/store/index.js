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
            status: 1,
            editing: false
          },
          {
            listname: 'Сделать верстку',
            status: 0,
            editing: false
          },
          {
            listname: 'Сделать функционал',
            status: 0,
            editing: false
          },
        ]
      },
      {
        id: '002',
        name: 'Прочитать книгу',
        list: [{
            listname: 'Купить книгу',
            status: 1,
            editing: false
          },
          {
            listname: 'Начать чтение',
            status: 1,
            editing: false
          },
          {
            listname: 'Завершить чтение',
            status: 1,
            editing: false
          },
        ]
      }
    ]
  },
  mutations: {
    addItem(state, payload) {
      state.todos.push(payload)
    },
    removeItem(state, payload) {
      state.todos = state.todos.filter(item => item.id != payload)
    },
    saveItem(state, payload) {
      state.todos = state.todos.map(
        (item) => {
          if (payload.id == item.id) {
            console.log(item)
            item = JSON.parse(JSON.stringify(payload))
          }

          return item
        }
      )
    }
  },
  actions: {
    addnew(context, payload) {
      context.commit('addItem', payload)
    },
    remove(context, payload) {
      context.commit('removeItem', payload)
    },
    save(context, payload) {
      context.commit('saveItem', payload)
    },
  },
  modules: {},
  getters: {
    todos: state => state.todos,
    todo: (state) => (id) => state.todos.filter(todo => todo.id == id)[0]
  }
});