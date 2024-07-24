import { Button, Modal, TextInput, Group as GroupUI } from '@mantine/core'
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import './Group.css'
import { GroupPropsType, NewGroup } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { createNewGroup } from '@/util/http';

function GroupModal(props: GroupPropsType) {
    const [members, setMembers] = useState<string[]>(["Someone"]);
    const userId = localStorage.getItem('userId') ?? ' '
    const { mutate}= useMutation({
      mutationFn: ({userId, group}) => createNewGroup(userId, group),
    });
    const ref = useRef<HTMLInputElement>(null);
    function addMember(){
      setMembers((prev) => {
      const newMembers =  [...prev]
      newMembers.push('Someone')
      return newMembers;
      })
    }
    function removeMember(index: number){
      setMembers((prev) =>{
        const newArray = [...prev]
        if(newArray.length === 1) return newArray
        newArray.splice(index, 1)
        return newArray
      });
    }
    function editMember(index: number, ev:ChangeEvent<HTMLInputElement>){
        setMembers((prev) => {
            const newMembers = [...prev]
            newMembers[index] = ev.target.value
            return newMembers
        })
    }
    function handleSubmit(ev: FormEvent<HTMLFormElement>){
      ev.preventDefault();
      const group: NewGroup = {
        name: ref.current?.value,
        groupMembers: members,
        createdAt: new Date().toJSON().slice(0,10)
      }
      mutate({userId, group})
      props.close();
    }
    
  return (
    <Modal opened={props.opened} onClose={props.close} title={props.title} centered={props.centered}
    >
        <form onSubmit={handleSubmit}>
        <TextInput 
        label="Group Name"
        placeholder='titans'
        style={{marginBottom: '1em'}}
        ref={ref}
        />
        {members.map((member, index) => <GroupUI key={index} align='end' style={{marginBottom: '1em'}}>
          <TextInput 
        label={`Member: ${index+1}`}
        defaultValue={member}
        onChange={(ev) => editMember(index, ev)}
        />
        <Button onClick={addMember}>
          Add
        </Button>
        <Button variant='light' onClick={() => removeMember(index)}>
          Remove
        </Button>
        </GroupUI>)}
        <Button type='submit'>
            Submit
        </Button>
        </form>
      </Modal>
  )
}

export default GroupModal