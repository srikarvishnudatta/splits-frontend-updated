import ExpenseSummary from '@/components/ExpenseSummary/ExpenseSummary';
import HeadingComponent from '@/components/HeadingComponent';
import NewTransactionModal from '@/components/NewTransactionModal';
import { fetchTransactions } from '@/util/http';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

function TransactionsPage() {
  const { pathname } = useLocation();
  const index = pathname.lastIndexOf('/');
  const groupId = pathname.substring(1, index);
  const { data } = useQuery({
    queryKey: ['transactions', groupId],
    queryFn: () => fetchTransactions(groupId),
  });
  const [opened, { open, close }] = useDisclosure(false);
  console.log(data);
  if (data) {
    const members = Object.keys(data.expensesMap);
    return (
      <>
        <HeadingComponent heading={'Your Expenses'} buttonText={'Add New Expense'} open={open}>
          <ExpenseSummary expenseMap={data.expensesMap} />
          <h1>Printing content</h1>
        </HeadingComponent>
        <NewTransactionModal
          opened={opened}
          close={close}
          title={'Add New Transaction'}
          centered={true}
          members={members}
          expensesMap={data.expensesMap}
          groupId={groupId}
        />
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
