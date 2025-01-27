import { FaSearch, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '@/store/tasksSlice'

export default function SearchBar() {
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.tasks.searchTerm)

  return (
    <div className="relative mb-6">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 border border-gray-600 
                 rounded-lg text-gray-100 placeholder-gray-400
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 focus:bg-gray-700 transition-all duration-200
                 outline-none [&::-webkit-search-cancel-button]:hidden
                 [&::-webkit-search-decoration]:hidden"
      />
      {searchTerm && (
        <button
          onClick={() => dispatch(setSearchTerm(''))}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 
                   text-gray-400 hover:text-gray-200 transition-colors"
        >
          <FaTimes />
        </button>
      )}
    </div>
  )
} 