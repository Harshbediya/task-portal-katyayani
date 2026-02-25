import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import api from '../api/axios';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            const response = await api.post('/tasks', { title, description, priority });
            onTaskAdded(response.data);
            setTitle('');
            setDescription('');
            setPriority('Medium');
        } catch (err) {
            console.error('Error adding task:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                Add New Task
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Task Title (required)"
                        className="input-field"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Description (optional)"
                        className="input-field min-h-[100px] resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Priority</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['Low', 'Medium', 'High'].map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPriority(p)}
                                className={`py-2 rounded-lg text-xs font-bold transition-all duration-300 border ${priority === p
                                    ? p === 'High' ? 'bg-red-500/20 border-red-500/50 text-red-400' :
                                        p === 'Medium' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' :
                                            'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                    : 'bg-slate-900/40 border-white/5 text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto px-8 py-3 mt-2"
                    disabled={loading}
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
