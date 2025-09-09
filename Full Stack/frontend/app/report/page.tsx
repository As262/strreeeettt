'use client';

import { useState, useEffect } from 'react';
import { apiClient, IssueCategory } from '@/lib/api';

export default function ReportPage() {
  const [categories, setCategories] = useState<IssueCategory[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null as File | null,
    latitude: 0,
    longitude: 0,
    address: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await apiClient.getCategories();
      if (data) setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        // For File type, only append if it's a file and not null
        if (key === 'image' && value instanceof File) {
          formDataToSend.append(key, value);
        } else if (key !== 'image') {
          formDataToSend.append(key, value as string);
        }
      }
    });

    const { data, error } = await apiClient.createReport(formDataToSend);

    if (data) {
      alert('Report submitted successfully!');
      // Reset form or redirect as needed
      setFormData({
        title: '',
        description: '',
        category: '',
        image: null,
        latitude: 0,
        longitude: 0,
        address: '',
      });
    } else {
      alert('Error submitting report: ' + error);
    }
  };

  return (
    <div>
      <h1>Report an Issue</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded h-32"
          required
        />

        {/* You can add file input, latitude, longitude, and address inputs here */}

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Submit Report
        </button>
      </form>
    </div>
  );
}
