"use client";

import { useWallet } from "@/lib/WalletProvider";
import { useOwner, useIsPaused, usePauseControls } from "@/hooks/useSoroban";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Activity, PauseCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  const { address } = useWallet();
  const { data: ownerAddress, isLoading: isLoadingOwner } = useOwner();
  const { data: isPaused, isLoading: isLoadingPaused } = useIsPaused();
  const { pause, unpause } = usePauseControls();

  const [confirmPauseOpen, setConfirmPauseOpen] = useState(false);
  const [confirmUnpauseOpen, setConfirmUnpauseOpen] = useState(false);

  // Authorization check
  if (!address || (ownerAddress && address !== ownerAddress)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-bold">Not Authorized</h1>
        <p className="text-muted-foreground text-center max-w-md">
          You do not have permission to view this page. Only the contract owner can access admin controls.
        </p>
      </div>
    );
  }

  const isPending = pause.isPending || unpause.isPending;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShieldAlert className="h-8 w-8 text-primary" />
          Admin Control Panel
        </h1>
        <p className="text-muted-foreground mt-2">
          Emergency controls for the StellarGive contract.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contract Status</CardTitle>
          <CardDescription>
            Manage the global paused state of the contract. Pausing prevents all state-mutating operations like creating campaigns or donating.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center gap-3">
              {isLoadingPaused ? (
                <Skeleton className="h-6 w-32" />
              ) : isPaused ? (
                <>
                  <PauseCircle className="h-5 w-5 text-destructive" />
                  <span className="font-semibold text-destructive">Status: Paused</span>
                </>
              ) : (
                <>
                  <Activity className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-500">Status: Active</span>
                </>
              )}
            </div>

            {isLoadingPaused || isLoadingOwner ? (
              <Skeleton className="h-10 w-32" />
            ) : isPaused ? (
              <Button
                variant="default"
                onClick={() => setConfirmUnpauseOpen(true)}
                disabled={isPending}
              >
                Unpause Contract
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => setConfirmPauseOpen(true)}
                disabled={isPending}
              >
                Pause Contract
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pause Confirmation Dialog */}
      <Dialog
        open={confirmPauseOpen}
        onOpenChange={(open) => {
          if (!pause.isPending) setConfirmPauseOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause Contract?</DialogTitle>
            <DialogDescription>
              Are you sure you want to pause the contract? This will immediately prevent all new campaigns and donations from being processed until unpaused.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmPauseOpen(false)}
              disabled={pause.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={pause.isPending}
              onClick={async () => {
                await pause.mutateAsync();
                setConfirmPauseOpen(false);
              }}
            >
              {pause.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Pausing...
                </>
              ) : (
                "Yes, Pause Contract"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unpause Confirmation Dialog */}
      <Dialog
        open={confirmUnpauseOpen}
        onOpenChange={(open) => {
          if (!unpause.isPending) setConfirmUnpauseOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unpause Contract?</DialogTitle>
            <DialogDescription>
              Are you sure you want to unpause the contract? Normal operations like creating campaigns and donations will resume immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmUnpauseOpen(false)}
              disabled={unpause.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              disabled={unpause.isPending}
              onClick={async () => {
                await unpause.mutateAsync();
                setConfirmUnpauseOpen(false);
              }}
            >
              {unpause.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Unpausing...
                </>
              ) : (
                "Yes, Unpause Contract"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
