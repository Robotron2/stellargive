import type { Meta, StoryObj } from "@storybook/react";
import { DonateModal } from "./DonateModal";
import { mockCampaign } from "@/stories/mocks";

// DonateModal pulls in `useDonate` → React Query + WalletProvider.
// Both providers are installed globally in .storybook/preview.tsx, so the
// trigger button renders standalone here. Click "Donate Now" inside the
// preview iframe to expand the dialog and review the open state.
const meta: Meta<typeof DonateModal> = {
  title: "Campaigns/DonateModal",
  component: DonateModal,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof DonateModal>;

export const Default: Story = {
  args: { campaign: mockCampaign },
};

export const Mobile: Story = {
  args: { campaign: mockCampaign },
  parameters: { viewport: { defaultViewport: "mobile" } },
};
