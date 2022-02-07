export default {
  install(Vue) {
    Vue.prototype.$initdata = function (storageName, data) {
      if (localStorage.getItem(storageName)) {
        const todolist = JSON.parse(localStorage.getItem(storageName))
        this.$store.commit('createList', todolist)
      } else {
        this.$store.setItem(storageName, JSON.stringify(data))
      }
    }

    Vue.prototype.$savedata = function (storageName, data) {
      if (localStorage.getItem(storageName)) {
        localStorage.removeItem(storageName)
      }
      localStorage.setItem("todolist", JSON.stringify(data));
    }
  }

}