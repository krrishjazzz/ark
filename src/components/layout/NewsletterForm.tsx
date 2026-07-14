"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input type="email" placeholder="Your email" aria-label="Email for newsletter" />
      <Button type="submit" variant="default" size="sm">
        Subscribe
      </Button>
    </form>
  );
}
