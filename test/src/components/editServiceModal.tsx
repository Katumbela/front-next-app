import { Service } from "@/infra/interfacess/service";
import { useState } from "react";
import toast from 'react-hot-toast';

interface EditServiceModalProps {
  service: Service;
  onClose: () => void;
  onSave: (updatedService: Service) => void;
}

const EditServiceModal = ({ service, onClose, onSave }: EditServiceModalProps) => {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);

  const handleSave = () => {
    onSave({ ...service, title, description, price });
    toast.success('Serviço alterado com sucess')
    onClose();
  };

  return (
    <div className=" fixed  bg-black/50 top-0 left-0 right-0 bottom-0 grid items-center place-content-center">
      <div className=" bg-white w-[25rem] h-[24rem] flex flex-col p-4 ">
        <h2 className="font-bold mb-3">Editar Serviço</h2>
        <div className="flex flex-col my-3">
          <label className="text-xs text-gray-500">Título:</label>
          <input
            type="text"
            className="border-2 py-1 px-2 outline-none focus:border-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-3">
          <label className="text-xs text-gray-500">Descrição:</label>
          <textarea
            value={description}
            className="border-2 py-1 px-2 outline-none focus:border-black"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-3">
          <label className="text-xs text-gray-500">Preço:</label>
          <input
            type="number"
            className="border-2 py-1 px-2 outline-none focus:border-black"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div className="flex justify-end mt-auto">
          <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 rounded-sm">
            Cancelar
          </button>
          <button onClick={handleSave} className="bg-black text-white px-3 py-1 rounded-sm ml-2">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;
