import type { NextPage } from "next";
import { Stack, Title, Button } from "@mantine/core";

import { useHook } from "./hook";

export const Home: NextPage = () => {
  const { logout } = useHook();

  return (
    <Stack align="flex-start">
      <Title>Home</Title>
      <Button onClick={logout}>Logout</Button>
    </Stack>
  );
};
