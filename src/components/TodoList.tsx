import React from 'react';
import { MoreVertical, CheckCircle2 } from 'lucide-react';

interface TodoItem {
  id: number;
  task: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const todos: TodoItem[] = [
  { id: 1, task: 'Elit est nibh cras phaselius scelerisque orci', assignee: 'Artur', priority: 'medium', completed: false },
  { id: 2, task: 'Uma nibh eget facilisis egestas mi', assignee: 'Marta', priority: 'low', completed: false },
  { id: 3, task: 'Enim tincidunt orci curabitur habitant', assignee: 'Artur', priority: 'medium', completed: false },
  { id: 4, task: 'Sed condimentum magnis dui bibendum', assignee: 'Marta', priority: 'high', completed: false },
];

export const TodoList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">To do's</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort</span>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-2">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="py-3 px-2 w-10">#</th>
              <th className="py-3 px-2">Task name</th>
              <th className="py-3 px-2">Assignee</th>
              <th className="py-3 px-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="border-t border-gray-100">
                <td className="py-3 px-2 text-gray-500">{todo.id}</td>
                <td className="py-3 px-2">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 text-gray-400">
                      <CheckCircle2 size={16} />
                    </div>
                    <span>{todo.task}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-700">{todo.assignee}</td>
                <td className="py-3 px-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    todo.priority === 'high' 
                      ? 'bg-red-100 text-red-600' 
                      : todo.priority === 'medium'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};