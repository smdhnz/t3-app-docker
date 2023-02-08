import type { AppType } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { api } from "../utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
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
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
