import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Splits
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        A simple app to split expenses among your friends. To create a group, enter your Email.
      </Text>
      <Text fw={500} fs={"italic"} ta={"center"}>Remember your friends don't need to enter their details</Text>
    </>
  );
}
