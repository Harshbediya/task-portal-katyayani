import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import api from '../api/axios';
import { Filter, ListChecks, LayoutGrid, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/tasks?status=${filter}`);
            setTasks(response.data);
        } catch (err) {
            console.error('Fetch tasks failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskAdded = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const handleToggle = async (id) => {
        try {
            const response = await api.patch(`/tasks/${id}/toggle`);
            setTasks(tasks.map(t => t._id === id ? response.data : t));
        } catch (err) {
            console.error('Toggle failed:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pb-20">
            <Navbar />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                {/* Left Column: Form and Stats */}
                <div className="lg:col-span-5 space-y-6">
                    <TaskForm onTaskAdded={handleTaskAdded} />

                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <LayoutGrid className="w-5 h-5 text-indigo-400" />
                            Quick Stats
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total</p>
                                <p className="text-2xl font-bold">{tasks.length}</p>
                            </div>
                            <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                                <p className="text-emerald-500/80 text-xs uppercase tracking-wider mb-1">Done</p>
                                <p className="text-2xl font-bold text-emerald-400">
                                    {tasks.filter(t => t.status === 'Completed').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: List and Filters */}
                <div className="lg:col-span-7">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <ListChecks className="w-6 h-6 text-indigo-400" />
                            Your Tasks
                        </h3>

                        <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5">
                            {['All', 'Pending', 'Completed'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${filter === f
                                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                            : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                <p>Loading your space...</p>
                            </div>
                        ) : tasks.length > 0 ? (
                            tasks.map(task => (
                                <TaskItem
                                    key={task._id}
                                    task={task}
                                    onToggle={handleToggle}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div className="glass-card p-12 text-center text-slate-500">
                                <p className="text-lg">No tasks found in "{filter}"</p>
                                <p className="text-sm mt-1">Start by adding a new task from the left panel</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
