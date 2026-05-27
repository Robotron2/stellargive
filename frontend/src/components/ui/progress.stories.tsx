import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress (Progress Bar)",
  component: Progress,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-96 max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Empty: Story = { args: { value: 0 } };

export const Quarter: Story = { args: { value: 25 } };

export const Half: Story = { args: { value: 50 } };

export const NearlyComplete: Story = { args: { value: 85 } };

export const Complete: Story = { args: { value: 100 } };

export const Thin: Story = {
  args: { value: 60, className: "h-1" },
};

export const Mobile: Story = {
  args: { value: 45 },
  parameters: { viewport: { defaultViewport: "mobile" } },
};
