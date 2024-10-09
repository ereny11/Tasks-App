export default {
  getTasks(state) {
    if (!state.allTasks) return
    return state.allTasks;
  },
  getErrors(state) {
    return state.error;
  },
};
