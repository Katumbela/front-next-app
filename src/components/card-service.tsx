"use client";
import { useState } from "react";
import useUser from "@/hooks/userHooks";
import { Service } from "@/infra/interfacess/service";
import { updateService, deleteService } from "@/services/service.service";
import EditServiceModal from "./editServiceModal";


interface IC {
    data: Service;
}

const CardService = ({ data }: IC) => {
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedService: Service) => {
        try {
            const updatedData = await updateService(
                updatedService.id,
                updatedService.title,
                updatedService.description,
                updatedService.price
            );
            console.log("Serviço atualizado com sucesso:", updatedData);
        } catch (error) {
            console.error("Erro ao atualizar o serviço:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteService(data.id);
            console.log("Serviço excluído com sucesso");
            // Remova o serviço da interface ou faça o que for necessário
        } catch (error) {
            console.error("Erro ao excluir o serviço:", error);
        }
    };

    return (
        <div className="bg-white flex flex-col text-black p-3 rounded-sm ">
            <h2 className="font-bold text-lg">{data.title}</h2>
            <p className="text-gray-500 mb-4 text-sm">{data.description}</p>
            <div className="flex mt-auto justify-between">
                <span className="text-3xl">${data.price}</span>
                <button className="bg-black text-white text-xs px-3 rounded-sm hover:scale-[1.01] transition-all">
                    Contract
                </button>
            </div>
            {user?.id === data.provider?.id && (
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white text-xs px-3 rounded-sm hover:scale-[1.01] transition-all"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white text-xs px-3 rounded-sm hover:scale-[1.01] transition-all"
                    >
                        Excluir
                    </button>
                </div>
            )}
            {isEditing && (
                <EditServiceModal
                    service={data}
                    onClose={() => setIsEditing(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default CardService;
