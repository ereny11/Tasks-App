import axios from "axios"
export default{
        async showAllTasks(){
            try{
                const resp = await axios.get("./../data/db.json")
                console.log("🚀 ~ showAllTasks ~ resp:", resp)
                this.state.allTasks = resp.data.tasks 
            }catch(e){
                console.log("🚀 ~ showAllTasks ~ e:", e)
                this.state.error = "Problem has occured, please try again!"
            }
            payload = resp.data;
            context.commit("showAllTasks", payload);
                  
        },
        removeTask(context, payload) {
            context.commit("removeTask", payload);
        },
        addNewTask(context, payload) {
            // context.commit("addNewProduct", payload);
            // const res = await axios.post("./../data/db.json", {
            //     id: state.allTasks.length+1,
            //     title: "new",
            //     body: "new"
            //   });
            //  state.allTasks= [...state.allTasks, res.data];
            context.commit("addNewTask", payload);
        },
        
    // async loadProducts(context, payload){
      
    //     const response  =  await axios.get(axios.defaults.baseURL);
    //       payload = response.data;
    //      context.commit("loadProducts", payload);
          
    //   },
}