// @ts-check
import { z } from "zod";

export const server = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  EFFECTIVE_DATETIME: z
    .string()
    .refine((str) => !isNaN(Number(str)), "not number")
    .transform((str) => Number(str)),
  APP_SECRET: z.string(),
});

export const client = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

/**
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
export const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  EFFECTIVE_DATETIME: process.env.EFFECTIVE_DATETIME,
  APP_SECRET: process.env.APP_SECRET,
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};

// Don't touch the part below
// --------------------------
const merged = server.merge(client);
/** @type z.infer<merged>
 *  @ts-ignore - can't type this properly in jsdoc */
let env;

if (!process.env.SKIP_ENV_VALIDATION) {
  const formatErrors = (
    /** @type {z.ZodFormattedError<Map<string,string>,string>} */
    errors
  ) =>
    Object.entries(errors)
      .map(([name, value]) => {
        if (value && "_errors" in value)
          return `${name}: ${value._errors.join(", ")}\n`;
      })
      .filter(Boolean);

  const isServer = typeof window === "undefined";

  const parsed = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv); // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(parsed.error.format())
    );
    throw new Error("Invalid environment variables");
  }

  /** @type z.infer<merged>
   *  @ts-ignore - can't type this properly in jsdoc */
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - can't type this properly in jsdoc
      return target[prop];
    },
  });
} else {
  /** @type z.infer<merged>
   *  @ts-ignore - can't type this properly in jsdoc */
  env = processEnv;
}

export { env };
