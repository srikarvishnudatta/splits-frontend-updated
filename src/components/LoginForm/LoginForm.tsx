import './LoginForm.css'
import { FormEvent, useEffect } from 'react'
import { Button,  TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import {createNewUser} from "../../util/http"
import { useNavigate } from 'react-router-dom'
function LoginForm() {
    const form = useForm({
        mode:"uncontrolled",
        initialValues:{
            email:""    
        },
        validate:{
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        }
    });
    const navigate = useNavigate();
   const {data, mutate, isPending, isSuccess} = useMutation({
    mutationFn: createNewUser,
   });  
   useEffect(()=>{
    if(isSuccess) {
        localStorage.setItem('userId', data.id);
        navigate('/user/groups')
    }
   }, [isSuccess])
    function handleSubmit(event: FormEvent){
        event.preventDefault();
        mutate({...form.getValues()})
    }
  return (
    <form className='login-form' onSubmit={handleSubmit}>
        <TextInput withAsterisk label="Email" placeholder='your@gmail.com' 
        key={form.key('email')}
        {...form.getInputProps('email')}
        required
        />
        {isPending ? <p>Submitting</p> : <Button type='submit'>
            Submit
        </Button>}
    </form>
  )
}

export default LoginForm