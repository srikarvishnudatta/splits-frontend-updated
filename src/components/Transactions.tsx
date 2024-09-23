import { TransactionType } from '@/types/types'
import Transaction from './Transaction'
import './Transaction.css'
import { Divider } from '@mantine/core'

function Transactions({transactions, groupId, refetch} : any) {
  return (
    <>
    <div className='transactions'>
        <Divider my={"md"}/>
            {transactions.map((transaction: TransactionType) => <Transaction key={transaction.transactionId} {...transaction} groupId={groupId}
            refetch={refetch}
            /> 
          )}
    </div>
    </>
  )
}

export default Transactions