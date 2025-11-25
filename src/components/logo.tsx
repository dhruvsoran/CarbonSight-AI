"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function Logo({
  size = 40,
  collapsible = false,
}: {
  size?: number;
  collapsible?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const logoContent = (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isOpen ? "text-primary-foreground" : "text-primary"}
      >
        <path
          d="M12 4.5C7 4.5 2 12 2 12C2 12 7 19.5 12 19.5C17 19.5 22 12 22 12C22 12 17 4.5 12 4.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          fill="currentColor"
        />
        <path
          d="M12 12C12 12 10.5 9.5 9 8C10.5 9.5 12 12 12 12Z"
          fill="currentColor"
        />
        <path
          d="M14.2418 10.5C13.6563 10.687 13.1251 11.0312 12.6997 11.5038C12.308 11.9363 12.0292 12.464 11.8913 13.033C12.4439 12.8912 12.934 12.6033 13.3168 12.213C13.7548 11.7656 14.0624 11.1684 14.2418 10.5Z"
          fill={isOpen ? 'hsl(var(--primary))' : 'hsl(var(--primary-foreground))'}
        />
      </svg>
      <span
        className={`font-semibold text-xl text-foreground ${
          collapsible ? 'group-data-[collapsible=icon]:hidden' : ''
        } ${isOpen ? 'text-primary-foreground' : 'text-foreground'}`}
      >
        CarbonSight <span className={isOpen ? 'text-white' : 'text-primary'}>AI</span>
      </span>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`focus:outline-none p-2 rounded-lg ${isOpen ? 'bg-primary' : ''}`}
        >
          {logoContent}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About CarbonSight AI</DialogTitle>
          <DialogDescription>
            AI-Powered Carbon Intelligence for Greener Mines
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            This application is a demonstration of how AI can be leveraged to help heavy industries like mining track, analyze, and reduce their carbon footprint.
          </p>
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
