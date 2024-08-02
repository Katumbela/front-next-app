import { Transaction } from '@/infra/interfacess/transaction';
import { getTransactions } from '@/services/transaction.service';
import useSWR from 'swr';


const fetcher = async () => {
  return getTransactions();
};

const TransactionHistory = () => {
  const { data, error } = useSWR('/api/transactions', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((transaction: Transaction) => (
        <li key={transaction.id}>
          {transaction.service} - {transaction.provider} - {transaction.client} - ${transaction.amount}
        </li>
      ))}
    </ul>
  );
};

export default TransactionHistory;
