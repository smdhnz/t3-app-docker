import type { z } from "zod";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

import { api } from "../../../utils/api";
import { useZodForm } from "../../../hooks";
import { loginSchema } from "../../../zodSchema";
import { errorNotice } from "../../../utils/notification";

type LoginSchema = z.infer<typeof loginSchema>;

export const useHook = () => {
  const router = useRouter();
  const { mutate } = api.user.login.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useZodForm({ schema: loginSchema });

  const onSubmit = (data: LoginSchema) =>
    mutate(data, {
      onSuccess: ({ token }) => {
        setCookie(null, "token", token);
        reset();
        router.replace("/").catch((e) => console.log(e));
      },
      onError: ({ message }) => {
        errorNotice(message);
        reset({ password: "" });
      },
    });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
