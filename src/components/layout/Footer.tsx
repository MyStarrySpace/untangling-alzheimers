'use client';

import { Container } from '@/components/ui';
import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800 bg-slate-900/50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm">
              A visualization of market failures in Alzheimer&apos;s research
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Concept by GoInvo Healthcare Design Studio
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://goinvo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              GoInvo
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
