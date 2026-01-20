'use client';

import Link from 'next/link';
import { Container } from '@/components/ui';
import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[var(--text-body)] text-sm font-medium">
              Untangling Alzheimer&apos;s
            </p>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              The science, the system, and the search for a cure
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/methodology"
              className="text-[var(--text-muted)] hover:text-[var(--accent-orange)] text-sm flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Methodology & Sources
            </Link>
            <Link
              href="/showcase"
              className="text-[var(--text-muted)] hover:text-[var(--accent-orange)] text-sm transition-colors"
            >
              Component Library
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
