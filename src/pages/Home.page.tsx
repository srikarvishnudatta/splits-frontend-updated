import { Welcome } from '../components/Welcome/Welcome';
import LoginForm from '@/components/LoginForm/LoginForm';

export function HomePage() {
  return (
    <>
      <Welcome />
      <LoginForm />
    </>
  );
}
