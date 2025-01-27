# Task Manager - Redux Toolkit Implementation

A task management application converted from React Context to Redux Toolkit for better state management.

## Project Structure

src/
├── components/
│ ├── shared/
│ │ └── PriorityBadge.jsx
│ ├── task/
│ │ ├── TaskForm.jsx
│ │ ├── TaskHistory.jsx
│ │ ├── TaskItem.jsx
│ │ └── TaskList.jsx
│ └── ui/
│ ├── FilterButtons.jsx
│ ├── SearchBar.jsx
│ └── Statistics.jsx
├── store/
│ ├── store.js
│ └── tasksSlice.js
├── utils/
│ └── priorityUtils.js
└── App.jsx


## Key Changes: Context API to Redux Toolkit

### 1. Store Setup
- Created Redux store using `configureStore`
- Implemented tasks slice with `createSlice`
- Added localStorage persistence

```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
export const store = configureStore({
reducer: {
tasks: tasksReducer
}
})
```

### 2. State Management
- Replaced Context API with Redux slice
- State structure:
  - tasks: Task list
  - taskHistory: Changes history
  - filter: Active filter
  - searchTerm: Search query

### 3. Key Features

#### Task Operations
- Add task
- Update task
- Delete task
- Toggle completion
- Track task history

#### Filtering & Search
- Filter by status (all/active/completed)
- Search tasks by text
- Memoized filtered results using `createSelector`

### 4. Component Changes

#### Before (Context):
```javascript
const { tasks, addTask } = useTasks()
```

#### After (Redux):
```javascript
const tasks = useSelector(state => state.tasks.tasks)
const dispatch = useDispatch()
dispatch(addTask(newTask))
```

### 5. Performance Optimizations
- Memoized selectors using `createSelector`
- Local state for UI components
- Efficient updates with Redux Toolkit's ImmerJS

## Core Features

1. **Task Management**
   - Create, edit, delete tasks
   - Set priority levels
   - Track completion status

2. **Filtering System**
   - Filter by status
   - Search functionality
   - Priority-based organization

3. **History Tracking**
   - Track all task changes
   - View modification history
   - Timestamp for all actions

4. **Statistics**
   - Total tasks count
   - Completion rate
   - Real-time updates

## Technical Implementation

### State Slice Example
```javascript
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      // Add task logic
    },
    updateTask: (state, action) => {
      // Update task logic
    }
    // ... other reducers
  }
})
```

### Memoized Selectors
```javascript
export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter, selectSearchTerm],
  (tasks, filter, searchTerm) => {
    // Filtering logic
  }
)
```

## Local Storage Integration
- Automatic state persistence
- Load saved tasks on startup
- Save changes automatically

## UI Components
- Responsive design
- Dark theme
- Interactive elements
- Priority-based styling

## Best Practices Used
1. Single source of truth (Redux store)
2. Immutable state updates
3. Memoized selectors
4. Component-level state when appropriate
5. Clear action creators
6. Consistent file structure

## Migration Benefits
1. Centralized state management
2. Better performance with memoization
3. Easier debugging
4. More predictable state updates
5. Better code organization