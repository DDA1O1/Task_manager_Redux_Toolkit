import { createSlice, createSelector } from '@reduxjs/toolkit'

const loadFromStorage = (key) => {
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : []
}

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const initialState = {
  tasks: loadFromStorage('tasks') || [],
  taskHistory: loadFromStorage('taskHistory') || [],
  filter: 'all',
  searchTerm: ''
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { text, priority } = action.payload
      const taskId = Date.now()
      
      state.tasks.push({
        id: taskId,
        text,
        completed: false,
        priority
      })
      
      state.taskHistory.push({
        taskId,
        type: 'ADD',
        newValue: { text, priority },
        timestamp: new Date().toISOString()
      })
      
      saveToStorage('tasks', state.tasks)
      saveToStorage('taskHistory', state.taskHistory)
    },
    updateTask: (state, action) => {
      const { id, newText, newPriority } = action.payload
      const task = state.tasks.find(t => t.id === id)
      
      state.tasks = state.tasks.map(t => 
        t.id === id ? {...t, text: newText, priority: newPriority} : t
      )
      
      state.taskHistory.push({
        taskId: id,
        type: 'EDIT',
        oldValue: { text: task.text, priority: task.priority },
        newValue: { text: newText, priority: newPriority },
        timestamp: new Date().toISOString()
      })
      
      saveToStorage('tasks', state.tasks)
      saveToStorage('taskHistory', state.taskHistory)
    },
    toggleTask: (state, action) => {
      state.tasks = state.tasks.map(task => 
        task.id === action.payload ? {...task, completed: !task.completed} : task
      )
      saveToStorage('tasks', state.tasks)
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      saveToStorage('tasks', state.tasks)
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    }
  }
})

// Memoized Selectors
const selectTasks = state => state.tasks.tasks
const selectFilter = state => state.tasks.filter
const selectSearchTerm = state => state.tasks.searchTerm

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter, selectSearchTerm],
  (tasks, filter, searchTerm) => {
    return tasks.filter(task => {
      const matchesSearch = searchTerm
        ? task.text.toLowerCase().includes(searchTerm.toLowerCase())
        : true
        
      const matchesFilter = filter === 'all' 
        ? true 
        : filter === 'completed' 
          ? task.completed 
          : !task.completed

      return matchesSearch && matchesFilter
    })
  }
)

export const { addTask, updateTask, toggleTask, deleteTask, setFilter, setSearchTerm } = tasksSlice.actions
export default tasksSlice.reducer 