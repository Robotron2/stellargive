import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CampaignCard } from "./CampaignCard";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  mockCampaign,
  mockClaimedCampaign,
  mockExpiredCampaign,
  mockFundedCampaign,
} from "@/stories/mocks";

const meta: Meta<typeof CampaignCard> = {
  title: "Campaigns/Card",
  component: CampaignCard,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CampaignCard>;

export const Default: Story = {
  args: { campaign: mockCampaign },
};

export const Funded: Story = {
  args: { campaign: mockFundedCampaign },
};

export const Expired: Story = {
  args: { campaign: mockExpiredCampaign },
};

export const Claimed: Story = {
  args: { campaign: mockClaimedCampaign },
};

// CampaignCard has no built-in loading prop; this story shows what the
// recommended skeleton placeholder looks like while a campaign is being
// fetched. Use this layout in CampaignList loading states.
export const LoadingSkeleton: Story = {
  render: () => (
    <Card className="flex flex-col">
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  ),
};

export const Mobile: Story = {
  args: { campaign: mockCampaign },
  parameters: { viewport: { defaultViewport: "mobile" } },
};
