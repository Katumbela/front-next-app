
"use client"; // Deve estar no início do arquivo



import CardService from '@/components/card-service';
import useUser from '@/hooks/userHooks';
import { Service } from '@/infra/interfacess/service';
import { getServices } from '@/services/service.service';

import useSWR from 'swr';


const fetcher = () => getServices();

const MyServices = () => {
    const { data, error } = useSWR('/services', fetcher);
    const { user, logout } = useUser()
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    function GoTo(link: string) {
        window.location.href = link
    }
    return (
        <div className="s p-20 mx-auto">
            <div className='flex justify-end'>
                <div className="flex gap-3">
                    <button onClick={() => GoTo('/my-services')} className="border-white text-white border-2 px-4 py-2  rounded-sm">
                        Meus Serviços
                    </button>
                    <div className="bg-white text-black px-4 py-2 border-2 rounded-sm">
                        {user?.fullName}
                    </div>
                    <button onClick={logout} className="bg-white cursor-pointer border-2 text-black px-4 py-2  rounded-sm">
                        Logout
                    </button>
                </div>
            </div>
            <div>
                <h2 className="text-white font-bold text-4xl">
                    Bulir App
                </h2>
                <p>
                    Search for local services to contract, whenever you want or even wherever
                </p>
            </div>
            <br />

            <div className='flex gap-6 flex-wrap sm:flex-nowrap'>
                {data.map((service: Service, i) => (
                    <CardService key={i} data={service} />
                ))}
            </div>
        </div>
    );
};

export default MyServices;
