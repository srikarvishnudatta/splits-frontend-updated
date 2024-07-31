import { Button, Card, Text, Group as GroupUI } from '@mantine/core';
import { IconCircleMinus, IconEdit, IconFile } from '@tabler/icons-react';
import './Group.css'
import { GroupType } from '@/types/types';
import { useDisclosure } from '@mantine/hooks';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { deleteGroup } from '../../util/http';
import { useNavigate } from 'react-router-dom';
function Group(groupData: GroupType) {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate()
  function navigateGroup(){
    navigate(`/${groupData.groupId}/transactions`)
  }
  return (
    <>
      <Card shadow='sm' padding={"lg"} radius={"md"} withBorder>
        <div className='group-card'>
        <Text fz={"h2"}>
            {groupData.name}
        </Text>
        <GroupUI >
        {groupData.groupMembers.map((member, index) => <Text key={index} variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>{member}</Text>)}
        </GroupUI>
        </div>
        <Text ff={"monospace"} fw={"lighter"} fz={"sm"}>
            Created on {groupData.createdAt}
        </Text>
        <div className='group-card'>
        <Button leftSection={<IconCircleMinus stroke={2} />} 
       onClick={open}>
            Delete
        </Button>
        <Button leftSection={<IconFile />} onClick={navigateGroup} >
            Open
        </Button>
        <Button leftSection={<IconEdit />} >
            Edit
        </Button>
        </div>
    </Card>
    <ConfirmModal close={close} opened={opened} title='Are you sure?' centered onConfirm={() => deleteGroup(groupData.groupId)}/>
    </>
  )
}

export default Group