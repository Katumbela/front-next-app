
"use client";
import { Service } from "@/infra/interfacess/service";

// Deve estar no início do arquivo

interface IC {
    data: Service
}

const CardService = ({ data }: IC) => {
    return (
        <div className="bg-white flex flex-col text-black p-3 rounded-sm ">
            <h2 className="font-bold text-lg">{data.title} </h2>
            <p className="text-gray-500 mb-4 text-sm">
                {data.description}
            </p>
            <div className="flex mt-auto justify-between">
                <span className="text-3xl">
                    ${data.price}
                </span>
                <button className="bg-black text-white text-xs px-3 rounded-sm hover:scale-[1.01] transition-all">
                    Contract
                </button>
            </div>
        </div>
    );
};

export default CardService;
