import { ReactNode } from 'react'
import { Button, Text, Divider } from '@mantine/core';
import { IconFilePlus } from '@tabler/icons-react';
import './HeadComponent.css'
interface HeadingComponentProps{
    heading:string;
    buttonText:string;
    children?: ReactNode;
    open:() => void
}
function HeadingComponent({heading, buttonText, children, open} : HeadingComponentProps) {
  return (
    <div className='heading-main'>
        <div className='heading'>
      <Text fz={"h2"} fw={"bold"}>{heading} </Text>
      <Button variant='outline' leftSection={<IconFilePlus stroke={1}/>} onClick={open}>{buttonText}</Button>
      </div>
      <Divider my={"md"}/>
        {children}
    </div>
  )
}

export default HeadingComponent