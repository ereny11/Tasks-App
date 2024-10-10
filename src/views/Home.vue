<template>
  <main class="posts-page">
    <h1>All Tasks</h1>
    <div v-if="errorFromStore">
      {{ errorFromStore }}
    </div>
    <ul v-if="taskssFromStore.length">
      <li v-for="task in taskssFromStore" :key="task.id" 
        :draggable="true"
        @dragstart="onDragStart(task.id)"
        @dragover.prevent
        @drop="onDrop(task.id)">
          <div class="editing" v-if="editedTitleId === task.id">
            <input
              v-model="task.title"
              @blur="editTitle"
              @keyup.enter="editTitle"
              :ref="`title${task.id}`"
              autofocus
              class="form-control editable-input"
            />
          </div>
          <div class="card-header" v-else>
            <div>
              <h3 class="post-title">
                {{ task.title }}
                <i class="pi pi-pencil" @click="editTitle(task.id)"></i>
              </h3>
            
            </div>
            <div>
              <select v-model="task.status" class="form-select" v-if="statusSelected && selectedOptionID ===task.id" @blur="showStatus" :ref="`option${task.id}`">
                <option>todo</option>
                <option>in-progress</option>
                <option>done</option>
              </select>
              <p class="selected-status" @click="showStatus(task.id)" v-else>
                {{ task.status }} <i class="pi pi-circle-fill" :class="task.status"></i>
              </p>
            </div>
          </div>

        <div v-for="field in fields" :key="task.id" class="editable-field">
          <div class="editing" v-if="editedFieldId === task.id">
            <textarea
              type="text"
              v-model="task.body"
              :ref="`field${task.id}`"
               @blur="editBody"
              @keyup.enter="editBody"
              class="form-control editable-input"
            ></textarea>
            <button class="save-btn btn" @click.prevent="editBody">
              <div>Save</div>
            </button>
          </div>
          <div v-else>
            <p>{{ task.body }}</p>
          </div>
        </div>

        <div class="container" v-if="editedFieldId !== task.id && showActions">
          <div class="row">
            <div class="col-1">
              <div @click.prevent="editBody(task.id)">
                <i class="pi pi-pen-to-square"></i>
              </div>
            </div>
            <div class="col-1">
              <div @click="deleteTask(task.id)">
                <i class="pi pi-trash"></i>
              </div>
            </div>
          </div>
        </div>
        
      </li>
      <li>
        <button class="add-btn" @click="addTask()">
          <i class="pi pi-plus"></i>
        </button>
      </li>
    </ul>

    <div v-else>No Data Found</div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, useTemplateRef } from 'vue'

export default defineComponent( {
  data() {
    return {
      editedFieldId: null,
      fields: [
        {
          id: 1,
          value: "",
        },
      ],
      selectedPostId: null,
      editedTitleId: null,
      selectedPostTitleId: null,
      showActions: true,
      editMode: false,
      draggingIndex: -1,
      statusSelected: false,
      selectedOptionID: null,
      selectedOption: null
    };
  },
  computed: {
    taskssFromStore() {
      return this.$store.getters["getTasks"];
    },
    errorFromStore() {
      return this.$store.getters["getErrors"];
    },
  },
  mounted() {
    this.$store.dispatch("showAllTasks");
  },
  methods: {
    deleteTask(index: any) {
      this.$store.dispatch("removeTask", index);
    },
    
    editBody(id: any) {
      const field = this.$refs["field" + id] as HTMLInputElement | any;
      if (id) {
        this.editedFieldId = id;
        this.selectedPostId = id;
         
          this.$nextTick(() => {
          if (this.$refs["field" + id]) {
            field[id].focus();
            // this.$refs["field" + id][id].focus();
            this.showActions = false;
          }
        });
        
      } else {
        this.editedFieldId = null;
        this.selectedPostId = null;
        this.showActions = true;
      }
      this.selectedPostId = null;
      this.showActions = true;
    },
    editTitle(id: any) {
      const field2 = this.$refs["title" + id] as HTMLInputElement | any;
      if (id) {
        this.editedTitleId = id;
        this.$nextTick(() => {
          if (this.$refs["title" + id]) {
            field2[id].focus();
            // this.$refs["title" + id][id].focus();
            this.selectedPostTitleId = null;
            this.editMode = false;
          }
        });
      } else {
        this.editedTitleId = null;
        this.selectedPostTitleId = null;
        this.editMode = true;
      }
      this.selectedPostTitleId = null;
      this.editMode = true;
    },
    addTask() {
      this.$store.dispatch("addNewTask", {
        id: null,
        title: "",
        body: "",
      });
    },
    onDragStart(index: number) {
       // Store the index of the item being dragged
      this.draggingIndex = index;
    },
    onDrop(index: number) {
      const draggedItem = this.taskssFromStore[this.draggingIndex]; // Get the dragged item
      // Remove the item from the original position
      this.taskssFromStore.splice(this.draggingIndex, 1);
      // Insert it into the new position
      this.taskssFromStore.splice(index, 0, draggedItem);
      this.draggingIndex = -1; // Reset dragging index
    },
    showStatus(index: any){
      // this.statusSelected = !this.statusSelected
      const field3 = this.$refs["option" + index] as HTMLInputElement | any;
      if (index) {
        this.selectedOptionID = index;
        this.$nextTick(() => {
          if (this.$refs["option" + index]) {
            field3[index].focus();
            // this.$refs["title" + id][id].focus();
            this.selectedOption = null;
            this.statusSelected = false;
          }
        });
      } else {
        this.selectedOption = null;
        this.statusSelected = true;
      }
      this.selectedOption = null;
      this.statusSelected = true;
    }
  },
})
</script>

<style>
.posts-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
}
.card-header{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
ul {
  list-style: none;
  max-width: 90%;
  padding: 0;
}
ul li{
 cursor: grab;
}
ul li:not(:last-child) {
  margin-bottom: 15px;
  border: 1px solid lightgray;
  padding: 10px 20px;
  border-radius: 4px;
}
li h3 {
  color: rgb(7, 57, 132);
  font-weight: 600;
  cursor: pointer;
}
.post-title i {
  display: none;
  transition: ease-in-out 0.5s;
}
.post-title:hover i {
  display: inline;
  transition: ease-in-out 0.5s;
}
li p {
  font-size: 16px;
}
li i {
  font-size: 14px;
}
.editing {
  text-align: left;
}
.editable-input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid lightgray;
  margin-bottom: 10px;
}
.editable-input:focus {
  box-shadow: none;
  border-color: lightgray;
}
.save-btn {
  background-color: #073883;
  color: #FFFFFF;
  border: 1px solid lightgray;
}
.save-btn:hover {
  background-color: lightgray;
  color: #073983;
}
.add-btn {
  background-color: #FFFFFF;
  border: 1px solid lightgray;
  color: #073983;
  border-radius: 0;
  padding: 10px 15px;
  box-shadow: 0px 0px 5px lightgray;
  transition: ease-in-out 0.3s;
}
.add-btn:hover {
  background-color: #073983;
  color: #FFFFFF;
  transition: ease-in-out 0.3s;
}
.selected-status{
  cursor: pointer;
}
.todo{
  color: red;
}
.done{
  color: green;
}
.in-progress{
  color: yellow;
}
</style>
