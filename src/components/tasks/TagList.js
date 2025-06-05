import React, { useState } from 'react';

export default function TagList({ tags, setTags }) {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput('');
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="tag-list mt-4">
      <label className="block mb-2 font-semibold text-gray-700">Tags</label>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map(tag => (
          <span
            key={tag}
            className="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded px-3 py-1 text-sm"
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="text-gray-600 hover:text-red-600 font-bold focus:outline-none"
              aria-label={`Remove tag ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add tag"
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
        />
        <button
          onClick={addTag}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}
