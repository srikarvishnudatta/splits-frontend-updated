import { TransactionBody, UpdateTransactionModalType } from '@/types/types'
import { Button, Modal, MultiSelect, NumberInput, Select, TextInput } from '@mantine/core'
import { ChangeEvent, FormEvent, useState } from 'react';

function UpdateTransactionModal(props: UpdateTransactionModalType) {
    const members = Object.keys(props.splitAmong);
    const fractions = members.filter((member) => props.splitAmong[member] !== 0);
    const [splits, setSplits] = useState(fractions);
    const [paidBy, setPaidBy] = useState(props.paidBy);
    const [newName, setNewName] = useState(props.transactionName);
    const [newValue, setNewValue] = useState(props.transactionValue);
    function handleUpdate(ev: FormEvent){
        ev.preventDefault();
        console.log(newName, newValue, splits, paidBy);
        const count = splits.length;
        const newFractions = members.map((member) => (
            splits.includes(member) ? {[member]: Number((newValue/count).toFixed(2)) } : {[member]:0}
        )).reduce((acc, curr) => {return {...acc, ...curr}}, {});
        const newBody: TransactionBody = {
            transactionName: newName,
            transactionValue: newValue,
            paidBy,
            splitAmong: newFractions
        }
    }
  return (
    <Modal 
    opened={props.opened}
      onClose={props.close}
      centered={props.centered}
      title={props.title}>
        <form onSubmit={handleUpdate}>
        <TextInput label={'Enter your transaction Name'} placeholder="Eg: Eggs or Walmart bill" 
         value={newName}
         onChange={(ev: ChangeEvent<HTMLInputElement>) => setNewName(ev.target.value)}
        required
        />
        <NumberInput label={'Enter the value'} placeholder="2$"
        value={newValue}
        onChange={setNewValue}
        required
        />
        <Select label={'Paid By '} data={members} value={paidBy}
        onChange={setPaidBy}
        />
        <MultiSelect
          data={members}
          label={'Split Among '}
        value={splits}
        onChange={setSplits}
        />
        <Button type="submit">Update</Button>
      </form>

    </Modal>
  )
}

export default UpdateTransactionModal