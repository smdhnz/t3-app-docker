import { showNotification } from "@mantine/notifications";

export const errorNotice = (message: string) =>
  showNotification({
    color: "red",
    title: "Error",
    message,
  });

export const successNotice = (message: string) =>
  showNotification({
    color: "green",
    title: "Success",
    message,
  });
