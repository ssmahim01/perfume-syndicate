"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p role="status" className="font-display text-xl text-ink">
        Thank you — you&rsquo;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-1 items-center gap-3 rounded-full border border-border bg-surface px-5 transition-colors focus-within:border-burgundy">
        <Mail size={16} strokeWidth={1.5} className="shrink-0 text-ink-soft" aria-hidden />
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-ink-soft/70"
        />
      </div>
      <button type="submit" className="btn-primary focus-ring justify-center rounded-full">
        Subscribe
        <ArrowRight size={15} strokeWidth={1.5} />
      </button>
    </form>
  );
}
