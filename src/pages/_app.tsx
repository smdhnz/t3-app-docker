import type { AppType } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { MantineProvider, Flex } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { Navbar } from "../components/ui";
import { navLinks } from "../navLinks";
import { api } from "../utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          defaultRadius: "md",
        }}
      >
        <NotificationsProvider position="top-center">
          <Flex>
            {router.pathname === "/login" ? null : (
              <Navbar navLinks={navLinks} />
            )}
            <Component {...pageProps} />
          </Flex>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
