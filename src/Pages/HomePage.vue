<template>
  <div class="main">
    <section>
      <div v-if="!showFormTask">
        <button class="buttonaddtask" @click="openNewTaskForm">
          + Adicionar Tarefa
        </button>
      </div>
      <div v-if="showFormTask" class="curtain" @click.self="closeForm">
        <div class="modal">
          <FormTask @close="closeForm" :task="SelectedTask" />
        </div>
      </div>
    </section>
    <section>
      <h1>Agenda</h1>
      <CalendarView />
    </section>
    <section class="taskList">
      <TaskList @edit-Task="openEditTaskForm" />
    </section>
  </div>
</template>

<script setup>
import FormTask from "../components/FormTask.vue";
import CalendarView from "../components/Calendar/CalendarView.vue";
import TaskList from "../components/TasksLists.vue";
import { useAgendaStore } from "../stores/useAgendaStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";


const store = useAgendaStore();
const { SelectedTask } = storeToRefs(store);

const showFormTask = ref(false);

const openNewTaskForm = () => {
  store.clearSelectedTask()
  showFormTask.value = true
}

const openEditTaskForm = async (id) => {
  await store.setSelectedTask(id)
  showFormTask.value = true
}

const closeForm = () => {
  store.clearSelectedTask()
  showFormTask.value = false
}

</script>

<style scoped>
* {
  padding: 0%;
  margin: 0%;
}

div {
  display: flex;
  flex-direction: column;
}

h1 {
  align-self: center;
}

section {
  justify-content: center;
}

.main {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

}

.taskList {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 50px;

}
.buttonaddtask {
  margin-left: 50px;
  margin-bottom: 20px;
  width: 200px;
  height: 40px;
  background-color: rgb(83, 138, 0);
  color: white;
  border: none;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
}

.curtain {
  position: fixed;
  inset: 0; /* top/right/bottom/left: 0 */
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
</style>
