<template>
  <div>
    <div class="addtask">
      <h4 @click="emit('close')">x</h4>
      <h1>{{isEditing ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}}</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">Título:</label>
          <input v-model="form.title" type="text" id="title" name="title" />
        </div>
        <div>
          <label for="description">Descrição:</label>
          <textarea
            v-model="form.description"
            id="description"
            name="description"
          ></textarea>
        </div>
        <div>
          <label for="dueDate">Data de Vencimento:</label>
          <input
            v-model="form.dueDate"
            type="date"
            id="dueDate"
            name="dueDate"
          />
        </div>
        <div>
          <label for="hour">Hora:</label>
          <input v-model="form.hour" type="time" id="hour" name="hour" />
        </div>
        <button type="submit">{{isEditing ? 'Salvar Alterações' : 'Adicionar Tarefa' }}</button>
        <br>
        <button v-if="isEditing" type="submit" style="background-color: red;" @click.prevent.stop="handleDeleteTask">Deletar Tarefa</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAgendaStore } from "../stores/useAgendaStore.js";
import { ref, watch, computed, defineEmits, defineProps } from "vue";

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const store = useAgendaStore();


const form = ref({
  title: '',
  description: '',
  dueDate: '',
  hour: '',
})

watch(
  () => props.task,
  (newVal) => {
    if (newVal) {
      form.value = {
        title: newVal.title,
        description: newVal.description,
        dueDate: newVal.dueDate,
        hour: newVal.hour,
      }
    } else {
      form.value = {
        title: '',
        description: '',
        dueDate: '',
        hour: '',
      }
    }
  },
  { immediate: true }
)

const isEditing = computed(() => !!props.task)

const handleSubmit = async () => {
  if (isEditing.value) {
    await store.updateTask(props.task.id, form.value)
  } else {
    await store.createTask(form.value)
  }

  emit('close')
}
const handleDeleteTask = async () => {
  if (isEditing.value) {
    await store.deleteTask(props.task.id)
  }
  emit('close')
}

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.addtask {
  width: 450px;
  height: 650px;
  background-color: rgb(255, 255, 255);
  position: fixed;
  border: 1px solid black;
  box-shadow: #3a3a3a 1px 5px 10px;
  border-radius: 20px;
  top: 10%;
  left: 35%;
}

h4 {
  text-align: center;
  cursor: pointer;
  margin: 5px;
  position: absolute;
  right: 1px;
  background-color: red;
  width: 20px;
  height: 20px;
  padding: 2px;
  color: white;
  border-radius: 50%;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

form > div {
  margin: 15px;
}
form > div > label {
  margin: 15px;
}
form > div > input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
}
form > div > textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

h1 {
  text-align: center;
  margin: 20px;
  font-family: helvetica;
  color: rgba(255, 166, 0, 0.678);
}
</style>
