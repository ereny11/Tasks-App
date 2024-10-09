export default {
  showAllTasks(state, payload) {
    state.allTasks = payload;
  },
  removeTask(state, payload) {
    state.allTasks = state.allTasks.filter((task) => task.id != payload);
  },
  addNewTask(state, payload) {
    payload.id = state.allTasks.length + 1
    payload.title = "New Task"
    payload.body = ""
    payload.status = "todo"
    console.log("addNewProduct")
    state.allTasks.push(payload)
    // localStorage.setItem('storedState', JSON.stringify(state))
},
};
