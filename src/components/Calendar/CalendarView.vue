<template>
  <div>
    <section class="mounthSelect">
      <h1 @click='prevMonth' style="cursor: pointer">{{ "<" }}</h1>
      <h1>Mês: {{ `${currentMonth + 1}  / ${currentYear}` }}</h1>
      <h1 @click='nextMonth'>{{ ">" }}</h1>
    </section>
    <section>
      <CalendarDay v-for="day in days" :key="day.id" :date="day.dia" :month="day.mes" :year="currentYear">
        {{ day.dia }}
      </CalendarDay>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import CalendarDay from "./CalendarDay.vue";

const days = ref({});

const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());

const getDays = () => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const temp = [];
  const cursor = new Date(firstDay);

  while (cursor.getMonth() === currentMonth.value) {
    temp.push({
      id: cursor.getDate()+currentMonth.value,
      dia: cursor.getDate(),
      mes: currentMonth.value,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  days.value = temp;
};

const nextMonth = () => {
  if(currentMonth.value === 11){
    currentMonth.value = 0;
    currentYear.value++;
  }
  else{
    currentMonth.value++;
  }
}
const prevMonth = () => {
  if(currentMonth.value === 0){
    currentMonth.value = 11;
    currentYear.value--;
  }
  else{
    currentMonth.value--;
  }
}

onMounted(() => {
  getDays();
});

watch([currentMonth, currentYear], () =>{
  getDays();
})

</script>
<style scoped>
h1{
  cursor: pointer;
  user-select: none;
}

div {
  display: flex;
  flex-direction: column;
}

section {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 10px;
  width: 100%;
}

.mounthSelect {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
