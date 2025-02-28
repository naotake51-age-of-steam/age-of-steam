"use client";

import { MantineThemeOverride, ModalProps } from "@mantine/core";

export const theme: MantineThemeOverride = {
  black: "#050505",
  components: {
    Modal: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      styles: (_theme: MantineThemeOverride, props: ModalProps) => ({
        header: {
          marginBottom: "10px",
        },
        title: {
          fontWeight: "bold",
          fontSize: "var(--mantine-h2-font-size)",
        },
      }),
    },
  },
} as const;
