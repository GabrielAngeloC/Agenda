import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAgendaStore = defineStore('agenda', () => {
    const selectedDate = ref(null)
    const tasks = ref([])
    const selectedTaskId = ref(null)

    const setSelectedDate = (date) => {
        selectedDate.value = date
    }

    const setSelectedTask = (id) => {
        selectedTaskId.value = id;
    }

    const SelectedTask = computed(() => {
        return tasks.value.find(t => t.id === selectedTaskId.value) || null
    })

    const createTask = async (payload) => {
        const { data } = await axios.post('http://localhost:3000/tasks', payload)
        tasks.value.push(data)
    }

    const updateTask = async (id, payload) => {
        const { data } = await axios.put(`http://localhost:3000/tasks/${id}`, payload)
        const index = tasks.value.findIndex(t => t.id === id)
        if (index !== -1) {
            tasks.value[index] = data
        }
    }

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:3000/tasks/${id}`)
        tasks.value = tasks.value.filter(t => t.id !== id)
    }


    const fetchTasks = () => {
        axios.get('http://localhost:3000/tasks')
            .then(response => {
                tasks.value = response.data
            })
            .catch(error => {
                console.error('Error fetching tasks:', error)
            })
    }

    const tasksOfSelectedDay = computed(() => {
        if (!selectedDate.value) return []
        return tasks.value.filter(t => t.dueDate === selectedDate.value)
    })

    // conjunto de datas que têm pelo menos 1 task
    const daysWithTasks = computed(() => {
        const set = new Set()
        for (const t of tasks.value) {
            if (t.dueDate) {
                set.add(t.dueDate) // ex: "2025-06-09"
            }
        }
        return set
    })

    const clearSelectedTask = () => {
        selectedTaskId.value = null
    }

    const hasTasksOnDate = (date) => {
        return daysWithTasks.value.has(date)
    }

    return {
        selectedDate,
        tasks,
        tasksOfSelectedDay,
        SelectedTask,
        selectedTaskId,
        clearSelectedTask,
        setSelectedTask,
        hasTasksOnDate,
        fetchTasks,
        setSelectedDate,
        createTask,
        updateTask,
        deleteTask
    }
})
