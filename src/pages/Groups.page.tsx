import { GroupType } from '@/types/types'
import { fetchUserGroups } from '@/util/http'
import { useQuery } from '@tanstack/react-query'
import { useDisclosure } from '@mantine/hooks';
import Group from '@/components/Group/Group';
import GroupModal from '@/components/Group/GroupModal';
import HeadingComponent from '@/components/HeadingComponent';
function GroupsPage() {
    const userId = localStorage.getItem('userId') ?? ' '
    const {data, isFetching, isError, refetch}= useQuery<GroupType[]>({
        queryKey:['groups', userId],
        queryFn: () => fetchUserGroups(userId),
        staleTime:300
    })
    const [opened, { open, close }] = useDisclosure(false);
    if(isFetching) return <div>Getting data</div>
    if (isError) {
        return <h1>Some error has </h1>
    }    
    return <>
    <HeadingComponent heading={'Your World'} buttonText={'New Group'} open={() => open()}  >
      {data?.length === 0 ? <div>
        <h1>Wow such empty</h1>
      </div> : (
        <div>
          {data?.map((group) => <Group key={group.groupId} {...group}/>)}
        </div>
      )}
    </HeadingComponent>
    <GroupModal  opened={opened} close={close} title="New Group" centered refetch={refetch}/>
    </>
}

export default GroupsPage