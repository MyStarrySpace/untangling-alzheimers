'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui';

const navItems = [
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Trials', href: '/#trial-barriers' },
  { label: 'System', href: '/#system' },
  { label: 'Science', href: '/#cascade' },
  { label: 'Stakes', href: '/#stakes' },
  { label: 'Methodology', href: '/methodology' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[var(--border)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-orange)] transition-colors"
          >
            Untangling Alzheimer&apos;s
          </Link>
          <ul className="flex items-center gap-1 sm:gap-6">
            {navItems.map((item) => {
              const isActive = item.href === '/methodology' && pathname === '/methodology';
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-2 sm:px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[var(--accent-orange)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--accent-orange)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </motion.header>
  );
}
