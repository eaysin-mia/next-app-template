"use client";

import React from "react";
import Link from "next/link";
import { Key } from "lucide-react";

export interface CheckoutContactStepProps {
  readonly brandName: string;
  readonly email: string;
  readonly onEmailChange: (email: string) => void;
  readonly isProcessingShop: boolean;
  readonly onContinueWithShop: () => void;
  readonly isProcessingPasskey: boolean;
  readonly onPasskey: () => void;
  readonly onViewSignedIn: () => void;
}

export function CheckoutContactStep({
  brandName,
  email,
  onEmailChange,
  isProcessingShop,
  onContinueWithShop,
  isProcessingPasskey,
  onPasskey,
  onViewSignedIn,
}: CheckoutContactStepProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight text-center">
        Sign in
      </h1>
      <p className="text-xs sm:text-sm text-muted text-center mt-1 font-normal">
        Or create an account
      </p>

      <div className="mt-5 w-full flex flex-col gap-2.5">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full h-11 px-3.5 rounded-xl bg-surface-secondary border border-transparent focus:border-accent focus:bg-surface text-foreground text-sm placeholder:text-muted outline-none transition-all shadow-2xs"
        />

        <button
          type="button"
          onClick={onContinueWithShop}
          disabled={isProcessingShop}
          className="w-full h-11 rounded-full bg-accent hover:bg-accent/90 active:scale-[0.99] text-accent-foreground font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-75"
        >
          {isProcessingShop ? (
            <span className="text-xs sm:text-sm">Connecting...</span>
          ) : (
            <>
              <span>Continue with</span>
              <span className="font-extrabold text-base tracking-tight italic lowercase">
                shop
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onPasskey}
          disabled={isProcessingPasskey}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-foreground hover:opacity-80 transition-opacity mt-1 cursor-pointer disabled:opacity-60"
        >
          <Key className="size-4 stroke-[2] text-foreground" />
          <span>
            {isProcessingPasskey
              ? "Authenticating passkey..."
              : "Use a passkey"}
          </span>
        </button>

        <p className="text-xs text-muted text-center leading-relaxed mt-3 px-1 font-normal">
          By continuing, you agree to Shop&apos;s{" "}
          <a href="#" className="underline hover:text-foreground">
            terms
          </a>
          ,{" "}
          <a href="#" className="underline hover:text-foreground">
            privacy policy
          </a>
          , and to sharing your name and email with {brandName}. See their{" "}
          <a href="#" className="underline hover:text-foreground">
            terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-foreground">
            privacy policy
          </a>
          .
        </p>

        <div className="mt-4 text-center flex items-center justify-center gap-2.5">
          <Link
            href="/cart"
            className="text-xs font-medium text-accent hover:underline cursor-pointer"
          >
            Back
          </Link>
          <span className="text-muted/40">·</span>
          <button
            type="button"
            onClick={onViewSignedIn}
            className="text-xs font-medium text-muted hover:text-foreground underline cursor-pointer"
          >
            View signed in
          </button>
        </div>
      </div>
    </div>
  );
}
