import {
  Center,
  Stack,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";

import { useHook } from "./hook";

export const Login = () => {
  const { register, handleSubmit, errors } = useHook();

  return (
    <Center h="100vh" w="100vw">
      <form onSubmit={handleSubmit}>
        <Stack align="flex-start">
          <Title>Title</Title>
          <TextInput
            w={250}
            label="Username"
            {...register("username")}
            error={errors.username?.message}
          />
          <PasswordInput
            w={250}
            label="Password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit" mt={10}>
            Login
          </Button>
        </Stack>
      </form>
    </Center>
  );
};
