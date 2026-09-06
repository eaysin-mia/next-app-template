"use client";

import React from "react";
import {
  Button,
  ModalRoot,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

export interface ProductReturnPolicyModalProps {
  readonly isOpen: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export function ProductReturnPolicyModal({
  isOpen,
  onOpenChange,
}: ProductReturnPolicyModalProps) {
  return (
    <ModalRoot isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50" />
      <ModalContainer className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <ModalDialog className="bg-surface text-foreground border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 relative">
          <ModalHeader>
            <ModalHeading className="font-bold text-lg text-foreground">
              Return Policy
            </ModalHeading>
          </ModalHeader>
          <ModalBody className="text-sm text-muted leading-relaxed">
            <p className="font-semibold text-foreground mb-1">
              30-Day Hassle-Free Returns & Exchanges
            </p>
            <p>
              We want you to love your purchase. If you&apos;re not completely
              satisfied, you can return or exchange eligible items within 30
              days of delivery.
            </p>
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li>Items must be unworn, unwashed, and with tags attached.</li>
              <li>Free return shipping on all domestic exchanges.</li>
              <li>
                Refunds processed back to your original payment method within 5
                business days.
              </li>
            </ul>
          </ModalBody>
          <ModalFooter className="pt-2 flex justify-end">
            <Button
              variant="primary"
              onPress={() => onOpenChange(false)}
              className="rounded-full font-semibold bg-foreground text-background hover:bg-foreground/90"
            >
              Got it
            </Button>
          </ModalFooter>
        </ModalDialog>
      </ModalContainer>
    </ModalRoot>
  );
}
