import { ConfirmModalProps } from '@/types/types'
import { Button, Modal } from '@mantine/core'
import './ConfirmModal.css'

function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Modal opened={props.opened} onClose={props.close} title={props.title} centered={props.centered} >
        <div className='modal-spacing'>
        <Button onClick={() => {
            props.onConfirm(); 
            props.close();
        }}>Yes, Confirm</Button>
        <Button variant='light'>Cancel</Button>
        </div>
    </Modal>
  )
}

export default ConfirmModal