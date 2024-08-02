import { createService } from '@/services/service.service';
import { isPositiveNumber } from '@/utils/validators';
import { useState } from 'react';


const CreateService = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !isPositiveNumber(price)) {
      alert('Invalid input');
      return;
    }
    try {
      const service = await createService(title, description, price as number);
      alert('Service created successfully');
       
    } catch (error) {
      
      alert('Failed to create service');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button type="submit">Create Service</button>
    </form>
  );
};

export default CreateService;
