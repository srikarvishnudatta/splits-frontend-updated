import { TransactionBody, TransactionModal } from '@/types/types';
import { newTransaction } from '@/util/http';
import { Button, Modal, MultiSelect, NumberInput, Select, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useRef, useState } from 'react';

function NewTransactionModal(props: TransactionModal) {
  const [paidBy, setPaidBy] = useState<string | null>('');
  const [spiltAmong, setSplitAmong] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const {mutate, isSuccess} = useMutation({
    mutationFn: ({groupId, body}) => newTransaction(groupId, body)
  });
  function submitHandler(ev: FormEvent){
    ev.preventDefault();
    // add a validation function to prevent unnecesary changes
    let amount = parseFloat(valueRef.current?.value || '0');  
    const name = nameRef.current?.value || '';  
    let count = spiltAmong.length;                  
    const fractions = props.members.map((member) => {
        if(spiltAmong.includes(member)) return {[member]: amount/count}
        return {[member]:0}
    })
    let newMap = {...props.expensesMap}
    const array = Object.keys(newMap)
    const paidIndex = array.findIndex((element) => element === paidBy)
    array.forEach((value, index)=> {
        newMap[paidBy][index] += fractions[index][value]
        newMap[value][paidIndex] -= fractions[index][value]
    });
    const body: TransactionBody = {
        transactionName: name,
        transactionValue: amount,
        paidBy: paidBy as string,
        splitAmong: fractions.join(" "),
        expensesMap: newMap
    }
    const groupId = props.groupId || " "
    console.log(groupId);
    mutate({groupId, body})
    if(isSuccess) props.close()
  }
  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      centered={props.centered}
      title={props.title}
    >
      <form onSubmit={submitHandler}>
        <TextInput label={'Enter your transaction Name'} placeholder="Eg: Eggs or Walmart bill" 
        ref={nameRef} defaultValue={""}
        required
        />
        <NumberInput label={'Enter the value'} placeholder="2$"
        defaultValue={0}
        ref={valueRef}
        required
        />
        <Select label={'Paid By '} data={props.members} value={paidBy} onChange={setPaidBy} />
        <MultiSelect
          data={props.members}
          label={'Split Among '}
          value={spiltAmong}
          onChange={setSplitAmong}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}

export default NewTransactionModal;