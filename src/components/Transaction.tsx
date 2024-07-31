import { TransactionType } from '@/types/types'
import { removeTransaction } from '@/util/http';
import { Button, Card, Text } from '@mantine/core'
import { IconCircleMinus } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query';

function Transaction(props: TransactionType) {
    const {mutate} = useMutation({mutationFn: ({transactionId, groupId}) => removeTransaction(transactionId, groupId)});
    function deleteTransaction(){
        const transactionId = props.transactionId;
        const groupId = props.groupId;
        mutate({transactionId, groupId})
    }
    
    const splitData = Object.keys(props.splitAmong);
    return (
        <Card className='transaction' shadow='sm' padding={"lg"} radius={"md"}>
            <div className='transaction-body'>
            <Text fz='h2'>
            {props.transactionName}
            </Text>
            <Text fz={'h2'}>
            ${props.transactionValue}
            </Text>
            </div>
            <div className='transaction-body'>
            <div>
            <Text fs={'italic'} ff={'monospace'} fz={'sm'} fw={'bold'}>
            Paid By: {props.paidBy}
            </Text>
            <Text fz={'xs'} fw={'normal'}>
            Shared Among: {splitData.map((element, index) => <span key={index}>{element} : {props.splitAmong[element]}$ </span>)}
            </Text>
            </div>
            <Button leftSection={<IconCircleMinus stroke={2} />} onClick={deleteTransaction}>
            Delete
        </Button>
            </div>
        </Card>
    )
}

export default Transaction