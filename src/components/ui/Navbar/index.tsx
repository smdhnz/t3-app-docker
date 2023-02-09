import type { ReactNode } from "react";
import { Box, Stack } from "@mantine/core";

import { NavLinkCollapse } from "./NavLinkCollapse";
import { NavLink } from "./NavLink";
import { useStyles } from "./style";

export type NavLinkType = {
  icon: ReactNode;
  label: string;
  href?: string;
  items?: NavLinkType[];
};

export const Navbar = (props: { navLinks: NavLinkType[] }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Stack spacing={0}>
        {props.navLinks.map((item) => {
          const key = item.href + item.label;
          return item.items ? (
            <NavLinkCollapse key={key} {...item} />
          ) : (
            <NavLink key={key} {...item} />
          );
        })}
      </Stack>
    </Box>
  );
};
