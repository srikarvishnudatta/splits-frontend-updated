import ExpenseSummary from '@/components/ExpenseSummary/ExpenseSummary';
import HeadingComponent from '@/components/HeadingComponent';
import NewTransactionModal from '@/components/NewTransactionModal';
import Transactions from '@/components/Transactions';
import { fetchTransactions } from '@/util/http';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

function TransactionsPage() {
  const { pathname } = useLocation();
  const index = pathname.lastIndexOf('/');
  const groupId = pathname.substring(1, index);
  const { data, refetch } = useQuery({
    queryKey: ['transactions', groupId],
    queryFn: () => fetchTransactions(groupId),
  });
  const [opened, { open, close }] = useDisclosure(false);
  if (data) {
    const members = Object.keys(data.expensesMap);
    return (
      <>
        <HeadingComponent heading={'Your Expenses'} buttonText={'Add New Expense'} open={open}>
          <ExpenseSummary expenseMap={data.expensesMap}/>
        </HeadingComponent>
        <NewTransactionModal
          opened={opened}
          close={close}
          title={'Add New Transaction'}
          centered={true}
          members={members}
          groupId={groupId}
          refetch={refetch}
        />
       <Transactions transactions={data.transactions} groupId={groupId} refetch={refetch}/>
      </>
    );
  }
  return (
    <>
      <h1>Fetching Data</h1>
    </>
  );
}

export default TransactionsPage;
