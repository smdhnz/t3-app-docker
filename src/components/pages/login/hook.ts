import type { z } from "zod";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";

import { api } from "../../../utils/api";
import { useZodForm } from "../../../hooks";
import { loginSchema } from "../../../zodSchema";

type LoginSchema = z.infer<typeof loginSchema>;

export const useHook = () => {
  const router = useRouter();
  const { mutate } = api.user.login.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm({ schema: loginSchema });

  const onSubmit = (data: LoginSchema) =>
    mutate(data, {
      onSuccess: ({ token }) => {
        setCookie(null, "token", token);
        router.replace("/").catch((e) => console.log(e));
      },
      onError: ({ message }) => {
        console.error(message);
        showNotification({
          title: "Error",
          message,
          color: "red",
        });
      },
    });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
