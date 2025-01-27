import { useSelector } from 'react-redux'
import { selectFilteredTasks } from '@/store/tasksSlice'
import TaskItem from '@/components/task/TaskItem'

export default function TaskList() {
  const filteredTasks = useSelector(selectFilteredTasks)
  
  return (
    <ul className="space-y-2">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
} 