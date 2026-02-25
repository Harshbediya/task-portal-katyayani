import React from 'react';
import { CheckCircle2, Circle, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const TaskItem = ({ task, onToggle, onDelete }) => {
    const isCompleted = task.status === 'Completed';

    return (
        <div className={`task-item glass-card p-4 flex items-start gap-4 mb-4 ${isCompleted ? 'opacity-70' : ''}`}>
            <button
                onClick={() => onToggle(task._id)}
                className={`mt-1 flex-shrink-0 transition-colors duration-300 ${isCompleted ? 'text-emerald-400' : 'text-slate-500 hover:text-indigo-400'}`}
            >
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </button>

            <div className="flex-grow">
                <h4 className={`text-lg font-medium transition-all duration-300 ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                    {task.title}
                </h4>
                {task.description && (
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        {task.description}
                    </p>
                )}
                <div className="flex items-center gap-3 mt-3">
                    <span className={isCompleted ? 'badge-completed' : 'badge-pending'}>
                        {task.status}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${task.priority === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                        task.priority === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                            'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        }`}>
                        {task.priority || 'Medium'}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs ml-auto">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(task._id)}
                className="text-slate-500 hover:text-red-400 transition-colors duration-300 p-2"
                title="Delete Task"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
};

export default TaskItem;
