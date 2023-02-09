import {
  UnstyledButton,
  Box,
  Text,
  Collapse,
  Group,
  Stack,
} from "@mantine/core";
import { TbChevronUp, TbChevronDown } from "react-icons/tb";
import { useToggle } from "@mantine/hooks";

import type { NavLinkType } from ".";
import { TextGroup } from "../typograph";
import { NavLink } from "./NavLink";
import { useStyles } from "./style";

export const NavLinkCollapse = (props: NavLinkType) => {
  const { classes } = useStyles();
  const { icon, label, items } = props;
  const [isOpen, toggle] = useToggle();
  const handler = () => toggle();

  return (
    <>
      <UnstyledButton onClick={handler}>
        <Box className={classes.button}>
          <TextGroup size={20} position="apart">
            <Group>
              {icon}
              <Text>{label}</Text>
            </Group>
            {isOpen ? <TbChevronUp /> : <TbChevronDown />}
          </TextGroup>
        </Box>
      </UnstyledButton>
      <Collapse in={isOpen}>
        <Stack spacing={0} sx={{ paddingLeft: 16 }}>
          {items?.map((item) => {
            const key = item.href + item.label;
            return <NavLink key={key} {...item} />;
          })}
        </Stack>
      </Collapse>
    </>
  );
};
