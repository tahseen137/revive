'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics';
import { useEffect } from 'react';

interface TrackedCTAProps {
  href: string;
  variant: 'a' | 'b';
  position: 'hero' | 'mid' | 'bottom' | 'pricing';
  label: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A/B Test tracked CTA button.
 * Fires a Vercel Analytics event on click with variant + position info.
 */
export function TrackedCTA({
  href,
  variant,
  position,
  label,
  className,
  children,
}: TrackedCTAProps) {
  const handleClick = () => {
    try {
      track('CTA Click', {
        variant,
        position,
        label,
      });
    } catch {
      // Fail silently — never break the CTA
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

/**
 * A/B Test pageview tracker.
 * Fires once on mount with the variant that was shown.
 */
export function ABVariantTracker({ variant }: { variant: 'a' | 'b' }) {
  useEffect(() => {
    try {
      track('AB Variant Shown', { variant });
    } catch {
      // Fail silently
    }
  }, [variant]);

  return null;
}
