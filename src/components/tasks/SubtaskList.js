import React, { useState } from 'react';

export default function SubtaskList({ subtasks, setSubtasks }) {
  const [subtaskInput, setSubtaskInput] = useState('');

  const addSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([...subtasks, { title: subtaskInput, completed: false }]);
      setSubtaskInput('');
    }
  };

  const removeSubtask = (index) => {
    const updated = [...subtasks];
    updated.splice(index, 1);
    setSubtasks(updated);
  };

  return (
    <div className="subtask-list mt-4">
      <label className="block mb-2 font-semibold text-gray-700">Subtasks</label>

      <ul className="mb-3 space-y-2 max-h-40 overflow-y-auto">
        {subtasks.map((s, i) => (
          <li
            key={i}
            className="flex items-center justify-between bg-gray-100 rounded px-3 py-1"
          >
            <span>{s.title}</span>
            <button
              onClick={() => removeSubtask(i)}
              className="text-red-500 hover:text-red-700 font-bold"
              aria-label={`Remove subtask ${s.title}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      <div className="flex space-x-2">
        <input
          type="text"
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          placeholder="New subtask"
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addSubtask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}
