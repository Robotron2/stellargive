import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WalletProvider } from "../src/lib/WalletProvider";
import "../src/app/globals.css";

const storybookQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false, staleTime: Infinity },
    mutations: { retry: false },
  },
});

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    layout: "centered",
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile (390×844)",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet (768×1024)",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop (1280×800)",
          styles: { width: "1280px", height: "800px" },
          type: "desktop",
        },
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "light",
    }),
    (Story) => (
      <QueryClientProvider client={storybookQueryClient}>
        <WalletProvider>
          <div className="bg-background text-foreground p-6 min-w-[320px]">
            <Story />
          </div>
        </WalletProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
