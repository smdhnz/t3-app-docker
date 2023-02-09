import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  button: {
    paddingBlock: 8,
    paddingInline: 16,
    borderRadius: theme.radius.md,
    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
  },
  wrapper: {
    padding: 6,
    position: "sticky",
    height: "100vh",
    minWidth: 250,
    backgroundColor: theme.colors.gray[0],
    borderRightWidth: 1,
    borderRightColor: theme.colors.gray[3],
    borderRightStyle: "solid",
    [theme.fn.smallerThan("xs")]: { display: "none" },
  },
}));
