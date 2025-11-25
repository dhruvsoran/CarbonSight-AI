"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({
  size = 40,
  collapsible = false,
}: {
  size?: number;
  collapsible?: boolean;
}) {
  return (
    <Link href="/" aria-label="Back to homepage" className="inline-block">
      <div
        className={cn(
          "flex items-center gap-3 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-95"
        )}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            fill="currentColor"
            className="text-primary/30"
          />
          <path 
            d="M12 17.5c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"
            fill="currentColor"
            className="text-primary"
          />
          <path 
            d="M12 12.5a.5.5 0 0 1-.5-.5V9.5a.5.5 0 0 1 1 0v2.5a.5.5 0 0 1-.5.5z"
            fill="currentColor"
            className="text-primary-foreground"
          />
          <path
            d="M9.47 14.53a.5.5 0 0 1-.35-.15l-2-2a.5.5 0 0 1 .7-.7l2 2a.5.5 0 0 1-.35.85z"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
        <span
          className={cn(
            'font-semibold text-xl text-foreground',
            collapsible ? 'group-data-[collapsible=icon]:hidden' : ''
          )}
        >
          CarbonSight <span className="text-primary">AI</span>
        </span>
      </div>
    </Link>
  );
}