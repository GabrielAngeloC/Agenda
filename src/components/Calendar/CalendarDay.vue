<template>
  <div :class="style" @click="SelectDay">
    <slot />
  </div>
</template>
<script setup>
import { computed, defineProps } from "vue";
import { useAgendaStore } from "../../stores/useAgendaStore.js";

const store = useAgendaStore();

const props = defineProps(["date", "month", "year"]);

const today = new Date();
const isToDay = computed(() => {
  return props.date === today.getDate() && props.month === today.getMonth();
});
const hasTask = computed(() => {
  const d = new Date(props.year, props.month, props.date);
  const iso = d.toISOString().split("T")[0];
  return store.hasTasksOnDate(iso);
});

const style = computed(() => {
  if (isToDay.value) {
    return "toDay";
  } else if (hasTask.value) {
    return "dayHasTask";
  } else {
    return "day";
  }
});

const SelectDay = () => {
  const d = new Date(props.year, props.month, props.date);

  const iso = d.toISOString().split("T")[0];
  store.setSelectedDate(iso);
};
</script>

<style scoped>
div {
  border: 1px solid #ccc;
  padding: 10px;
  width: 120px;
  height: 120px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
  user-select: none;
}

.toDay {
  display: flex;
  justify-content: center;
  background-color: rgba(0, 238, 255, 0.877);
  color: white;
  padding: 10px black;
  border: 1px solid black;
  font-size: 60px;
}

.day {
  display: flex;
  justify-content: center;
  font-size: 50px;
}

.dayHasTask {
  background-color: rgba(83, 138, 0, 0.877);
  justify-content: center;
  font-size: 50px;
  color: white;
}

div:hover {
  background-color: #e0e0e0;
}
</style>
