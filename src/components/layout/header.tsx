"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Logo } from "../logo";
import Image from 'next/image';
import { DemoVideoDialog } from "../landing/demo-video-dialog";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <DemoVideoDialog>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <div className="cursor-pointer">Free Demo</div>
                </Button>
            </DemoVideoDialog>
          </nav>
        </div>
      </div>
    </header>
  );
}
