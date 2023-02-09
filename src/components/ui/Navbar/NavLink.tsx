import Link from "next/link";
import { UnstyledButton, Box, Text } from "@mantine/core";

import type { NavLinkType } from ".";
import { TextGroup } from "../typograph";
import { useStyles } from "./style";

export const NavLink = (props: NavLinkType) => {
  const { classes } = useStyles();
  const { icon, label, href } = props;

  return (
    <UnstyledButton component={Link} href={href ?? ""}>
      <Box className={classes.button}>
        <TextGroup size={20}>
          {icon}
          <Text>{label}</Text>
        </TextGroup>
      </Box>
    </UnstyledButton>
  );
};
