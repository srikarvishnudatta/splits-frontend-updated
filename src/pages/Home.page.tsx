import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import LoginForm from '@/components/LoginForm/LoginForm';

export function HomePage() {
  return (
    <>
      <Welcome />
      <LoginForm />
    </>
  );
}
