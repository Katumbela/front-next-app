"use client";

import { createService } from '@/services/service.service';
import { isPositiveNumber } from '@/utils/validators';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CreateService = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !isPositiveNumber(price)) {
      toast.error('Invalid input');
      return;
    }
    try {
      const service = await createService(title, description, price as number);
      toast.success('Service created successfully');
      // Clear form after successful submission
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      toast.error('Não tem permissão para criar serviços');
    }
  };

  return (
    <>

      <center className=' mt-[13rem]'>
        <a href="/services/list" className='border px-2 py-1'>  Voltar </a>
      </center>


      <div className="max-w-md mx-auto p-4 mt-[2rem] border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Criar Serviço - Bulir App</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-create"
              placeholder="Service Title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-create"
              placeholder="Service Description"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="input-create"
              placeholder="Service Price"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar Serviço
          </button>
        </form>
      </div>

    </>
  );
};

export default CreateService;
