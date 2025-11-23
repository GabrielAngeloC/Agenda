<template>
  <div>
    <h1 v-if="selectedDate" >Tarefas para o dia: {{ selectedDate }}</h1>
    <h1 v-else>Selecione um dia para ver as tarefas</h1>

    <div v-if="!tasksOfSelectedDay.length">
      Nenhuma tarefa para o dia selecionado.
    </div>

    <div class="task" v-for="task in tasksOfSelectedDay" :key="task.id" @click='handleClick(task.id)'>
      <section>
        <p>Tarefa: {{ task.title }}</p>
        <p>{{ task.description }}</p>
        <p>Hora: {{ task.hour }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, defineEmits } from "vue";
import { useAgendaStore } from "../stores/useAgendaStore.js";

const emit = defineEmits(["edit-task"])

const handleClick = (id) => {
  emit("edit-task", id)
}

const store = useAgendaStore();

const { tasksOfSelectedDay, selectedDate } = storeToRefs(store);

onMounted(() => {
  store.fetchTasks();
});
</script>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 25px;
  border: 1px solid black;
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.task:hover {
  background-color: #e0e0e0;
}
</style>
