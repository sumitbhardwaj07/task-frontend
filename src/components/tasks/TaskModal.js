import React, { useState } from 'react';
import SubtaskList from './SubtaskList';
import TagList from './TagList';

export default function TaskModal({ task = {}, onSave, onClose }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [tags, setTags] = useState(task.tags || []);
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [status, setStatus] = useState(task.status || 'todo');

  const handleSubmit = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      tags,
      subtasks,
      status,
    };
    onSave(updatedTask);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">
          {task.id ? 'Edit Task' : 'New Task'}
        </h3>

        <label className="block mb-1 font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />

        <label className="block mb-1 font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />

        <label className="block mb-1 font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <TagList tags={tags} setTags={setTags} />

        <SubtaskList subtasks={subtasks} setSubtasks={setSubtasks} />

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
