import type { NextPage } from "next";
import { Stack, Text, Button } from "@mantine/core";
import { TbHome } from "react-icons/tb";

import { useHook } from "./hook";
import { Title } from "../../ui";

export const Home: NextPage = () => {
  const { logout } = useHook();

  return (
    <Stack align="flex-start">
      <Title>
        <TbHome />
        <Text>Home</Text>
      </Title>
      <Button onClick={logout}>Logout</Button>
    </Stack>
  );
};
