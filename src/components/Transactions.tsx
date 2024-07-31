import { TransactionType } from '@/types/types'
import Transaction from './Transaction'
import './Transaction.css'
import { Divider } from '@mantine/core'

function Transactions({transactions, groupId} : any) {
  return (
    <>
    <div className='transactions'>
        <Divider my={"md"}/>
            {transactions.map((transaction: TransactionType) => <Transaction key={transaction.transactionId} {...transaction} groupId={groupId}/>)}
    </div>
    </>
  )
}

export default Transactions