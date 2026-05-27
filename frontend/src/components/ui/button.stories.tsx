import type { Meta, StoryObj } from "@storybook/react";
import { Loader2 } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Donate Now",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Cancel Campaign" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Cancel" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Share" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Skip" },
};

export const Link: Story = {
  args: { variant: "link", children: "View details" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Donating...
      </>
    ),
  },
};

export const DisabledError: Story = {
  args: { variant: "destructive", disabled: true, children: "Action failed" },
};

export const Mobile: Story = {
  args: { children: "Donate" },
  parameters: { viewport: { defaultViewport: "mobile" } },
};
