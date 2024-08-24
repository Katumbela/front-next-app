"use client";

import NavBar from '@/components/navbar';
import useUser from '@/hooks/userHooks';
import { Transaction } from '@/infra/interfacess/transaction';
import { getTransactions } from '@/services/transaction.service';
import useSWR from 'swr';

// Atualize o fetcher para aceitar um parâmetro userId
const fetcher = async (userId: number) => {
  const transactions = await getTransactions(userId);
  //  console.log(transactions); // Verifique o formato dos dados
  return transactions;
};

const TransactionHistory = () => {
  const { user } = useUser();

  //console.log(user)
  // Verifique se o user está disponível e se o userId é um número
  const { data, error } = useSWR(
    user?.id ? `/transactions/${user?.id}` : null,
    () => fetcher(user?.id ? user?.id : 0)  // Utilize o id do usuário logado
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data)
  return (
    <div className='p-20'>
      <NavBar />
      <div>
        <a className='bg-white text-black px-2 py-1 mb-4' href="/services/list">Home</a>

        <h2 className="text-3xl font-bold text-white">
          Suas Transacoes
        </h2>
      </div>
      <br />
      <br />
      <ul>

        <table className='table table-fixed w-full'>
          <thead >
            <tr className='bg-white/30  px-4'>
              <td>
                Service Id
              </td>
              <td>Provedor</td>
              <td>Cliente</td>
              <td>Preço</td>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction: Transaction) => (

              <tr key={transaction.id}>
                <td> {transaction.serviceId} </td>
                <td>
                  {transaction.provider.fullName}
                </td>
                <td> {transaction.client.fullName}</td>
                <td>
                  {transaction.amount} Kz
                </td>
              </tr>
            ))}


          </tbody>
        </table>

      </ul>
    </div>
  );

};

export default TransactionHistory;
