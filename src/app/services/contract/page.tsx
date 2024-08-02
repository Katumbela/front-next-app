import { useState } from 'react';
import axios from 'axios';

const ContractService = () => {
    const [serviceId, setServiceId] = useState('');
    const [clientId, setClientId] = useState('');

    const handleContract = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/contracts', { serviceId, clientId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.log('efve')
        }
    };

    return (
        <div>
            <input type="text" value={serviceId} onChange={(e) => setServiceId(e.target.value)} />
            <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} />
            <button onClick={handleContract}>Contract Service</button>
        </div>
    );
};

export default ContractService;
