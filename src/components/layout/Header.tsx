'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { Container } from '@/components/ui';

const navItems = [
  { label: 'The Paradox', href: '#paradox' },
  { label: 'The System', href: '#system' },
  { label: 'Case Studies', href: '#cases' },
  { label: 'The Stakes', href: '#stakes' },
];

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 text-white font-semibold">
            <Brain className="w-6 h-6 text-blue-500" />
            <span className="hidden sm:inline">AD Market Failure</span>
          </a>
          <ul className="flex items-center gap-1 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-2 sm:px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </motion.header>
  );
}
