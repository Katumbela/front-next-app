
"use client"; // Deve estar no início do arquivo



import { Service } from '@/infra/interfacess/service';
import { getServices } from '@/services/service.service';
import useSWR from 'swr';


const fetcher = () => getServices();

const ServiceList = () => {
    const { data, error } = useSWR('/api/services', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <ul>
            {data.map((service: Service) => (
                <li key={service.id}>
                    {service.title} - {service.description} - ${service.price}

                </li>
            ))}
        </ul>
    );
};

export default ServiceList;
