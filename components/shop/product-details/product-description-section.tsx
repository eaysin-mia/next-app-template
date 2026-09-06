"use client";

import React, { useState } from "react";

export interface ProductDescriptionSectionProps {
  readonly paragraphs?: readonly string[];
}

export function ProductDescriptionSection({
  paragraphs,
}: ProductDescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const hasParagraphs = paragraphs && paragraphs.length > 0;

  return (
    <div className="flex flex-col gap-2 pt-3 border-t border-border/60">
      <p className="text-[16px] font-semibold text-foreground leading-[1.38] tracking-[-0.5px]">
        Description
      </p>

      <div className="text-[14px] font-normal text-foreground leading-[1.29] tracking-[-0.2px] flex flex-col gap-1.5">
        {hasParagraphs ? (
          <>
            {!isExpanded ? (
              <>
                {paragraphs.slice(0, 4).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                {paragraphs.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="font-semibold text-foreground hover:underline cursor-pointer inline text-left mt-0.5 text-[14px]"
                  >
                    View more
                  </button>
                )}
              </>
            ) : (
              <>
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="font-semibold text-foreground hover:underline cursor-pointer inline text-left mt-0.5 text-[14px]"
                >
                  View less
                </button>
              </>
            )}
          </>
        ) : (
          <p>Designed for everyday comfort and premium durability.</p>
        )}
      </div>
    </div>
  );
}
