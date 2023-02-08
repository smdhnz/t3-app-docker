import type { TextProps, GroupProps } from "@mantine/core";
import { Group, Text } from "@mantine/core";

export const TextGroup = (props: TextProps & GroupProps) => (
  <Text component={Group} {...props}>
    {props.children}
  </Text>
);
