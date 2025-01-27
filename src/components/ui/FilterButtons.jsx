import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@/store/tasksSlice'

export default function FilterButtons() {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.tasks.filter)
  const filters = ['all', 'active', 'completed']

  return (
    <div className="flex gap-3 mb-6">
      {filters.map((filterType) => (
        <button 
          key={filterType}
          onClick={() => dispatch(setFilter(filterType))}
          className={`px-4 py-2 rounded-lg capitalize transition-colors ${
            filter === filterType 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {filterType}
        </button>
      ))}
    </div>
  )
} 