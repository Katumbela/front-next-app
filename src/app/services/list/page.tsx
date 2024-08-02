
"use client"; // Deve estar no início do arquivo



import CardService from '@/components/card-service';
import useUser from '@/hooks/userHooks';
import { Service } from '@/infra/interfacess/service';
import { getServices } from '@/services/service.service';
import useSWR from 'swr';


const fetcher = () => getServices();

const ServiceList = () => {
    const { data, error } = useSWR('/services', fetcher);
    const { user, logout } = useUser()
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="s p-20 mx-auto">
            <div className='flex justify-end'>
                <div className="flex gap-3">
                    <div className="bg-white text-black px-4 py-2  rounded-sm">
                        {user?.fullName}
                    </div>
                    <div onClick={logout} className="bg-white text-black px-4 py-2  rounded-sm">
                        Logout
                    </div>
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

export default ServiceList;
