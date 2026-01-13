'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Download,
  ExternalLink,
  ArrowRight,
  Check,
  AlertCircle,
  Info
} from 'lucide-react';
import { Container, Section, Card, CardContent, CardHeader, Button, Heading } from '@/components/ui';

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <Section id="showcase-hero" className="pt-24">
        <Container>
          <Heading level={1} className="mb-4">Component Library</Heading>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl">
            A collection of reusable components for the Untangling Alzheimer&apos;s project,
            following GoInvo design principles.
          </p>
        </Container>
      </Section>

      {/* Typography */}
      <Section id="typography">
        <Container>
          <SectionTitle>Typography</SectionTitle>
          <Card variant="default" hover={false}>
            <CardContent className="space-y-8">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">Heading 1 (Neuton)</p>
                <Heading level={1}>Untangling Alzheimer&apos;s</Heading>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">Heading 2 (Neuton)</p>
                <Heading level={2}>The Investment Paradox</Heading>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">Heading 3 (Neuton)</p>
                <Heading level={3}>Case Studies in Market Failure</Heading>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">Body Text (Encode Sans)</p>
                <p className="text-[var(--text-body)]">
                  Each of these researchers proposed that amyloid was a consequence—not a
                  cause—of upstream dysfunction. Each was marginalized as the field
                  consolidated around the amyloid cascade hypothesis.
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">Muted Text</p>
                <p className="text-[var(--text-muted)]">
                  Supporting information and secondary content appears in muted gray.
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-2">Accent Text</p>
                <p className="text-[var(--text-body)]">
                  Important terms can be <span className="text-[var(--accent-orange)] font-semibold">highlighted with orange</span> for emphasis.
                </p>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Colors */}
      <Section id="colors" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Color Palette</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Primary BG" color="var(--bg-primary)" hex="#faf9f7" />
            <ColorSwatch name="Secondary BG" color="var(--bg-secondary)" hex="#f5f3f0" />
            <ColorSwatch name="Card BG" color="var(--bg-card)" hex="#ffffff" />
            <ColorSwatch name="Border" color="var(--border)" hex="#e5e2dd" />
            <ColorSwatch name="Text Primary" color="var(--text-primary)" hex="#2d2d2d" dark />
            <ColorSwatch name="Text Body" color="var(--text-body)" hex="#4a4a4a" dark />
            <ColorSwatch name="Text Muted" color="var(--text-muted)" hex="#7a7a7a" dark />
            <ColorSwatch name="Accent Orange" color="var(--accent-orange)" hex="#e36216" dark />
            <ColorSwatch name="Success" color="var(--success)" hex="#5a8a6e" dark />
            <ColorSwatch name="Danger" color="var(--danger)" hex="#c75146" dark />
            <ColorSwatch name="Category Blue" color="var(--category-amyloid)" hex="#60a5fa" dark />
            <ColorSwatch name="Category Purple" color="var(--category-vascular)" hex="#a78bfa" dark />
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section id="buttons">
        <Container>
          <SectionTitle>Buttons</SectionTitle>
          <Card variant="default" hover={false}>
            <CardContent className="space-y-8">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Primary Button</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Secondary Button</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="secondary" disabled>Disabled</Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Ghost Button</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost">Ghost Action</Button>
                  <Button variant="ghost" disabled>Disabled</Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">With Icons</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="secondary">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="ghost">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Source
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Sizes</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Cards */}
      <Section id="cards" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Cards</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="default">
              <CardHeader>
                <Heading level={4}>Default Card</Heading>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-body)]">
                  Standard card for general content. White background with subtle border.
                </p>
              </CardContent>
            </Card>
            <Card variant="highlighted">
              <CardHeader>
                <Heading level={4}>Highlighted Card</Heading>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-body)]">
                  Used for important callouts or featured content. Orange-tinted background.
                </p>
              </CardContent>
            </Card>
            <Card variant="success">
              <CardHeader>
                <Heading level={4}>Success Card</Heading>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-body)]">
                  Indicates positive outcomes or successful actions. Green-tinted background.
                </p>
              </CardContent>
            </Card>
            <Card variant="danger">
              <CardHeader>
                <Heading level={4}>Danger Card</Heading>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-body)]">
                  Highlights warnings or critical information. Red-tinted background.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Badges/Tags */}
      <Section id="badges">
        <Container>
          <SectionTitle>Badges &amp; Tags</SectionTitle>
          <Card variant="default" hover={false}>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Status Badges</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-4">Category Tags</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="amyloid">Amyloid</Badge>
                  <Badge variant="vascular">Vascular</Badge>
                  <Badge variant="metabolic">Metabolic</Badge>
                  <Badge variant="lysosomal">Lysosomal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Alerts */}
      <Section id="alerts" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Alerts</SectionTitle>
          <div className="space-y-4">
            <Alert variant="info">
              <Info className="w-5 h-5" />
              <span>This is an informational message about the current state.</span>
            </Alert>
            <Alert variant="success">
              <Check className="w-5 h-5" />
              <span>Success! The operation completed successfully.</span>
            </Alert>
            <Alert variant="warning">
              <AlertCircle className="w-5 h-5" />
              <span>Warning: Please review this information carefully.</span>
            </Alert>
            <Alert variant="danger">
              <AlertCircle className="w-5 h-5" />
              <span>Error: Something went wrong. Please try again.</span>
            </Alert>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section id="stats">
        <Container>
          <SectionTitle>Statistics Display</SectionTitle>
          <Card variant="default" hover={false}>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatDisplay value="55 million+" label="People living with dementia worldwide (2020)" />
                <StatDisplay value="99%" label="Clinical trial failure rate (2002-2012)" highlight />
                <StatDisplay value="~850:1" label="Novel molecule vs. repurposed drug trial ratio" />
                <StatDisplay value="$42.5 Billion" label="Cumulative private R&D expenditure (1995-2001)" />
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Tables */}
      <Section id="tables" className="bg-[var(--bg-secondary)]">
        <Container>
          <SectionTitle>Tables</SectionTitle>
          <Card variant="default" hover={false}>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Drug</th>
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Cost/Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-4 text-[var(--text-primary)] font-medium">Lecanemab</td>
                      <td className="py-3 px-4 text-[var(--text-body)]">Monoclonal Antibody</td>
                      <td className="py-3 px-4"><Badge variant="success">Approved</Badge></td>
                      <td className="py-3 px-4 text-[var(--accent-orange)] font-mono">$26,500</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-4 text-[var(--text-primary)] font-medium">Lithium</td>
                      <td className="py-3 px-4 text-[var(--text-body)]">Generic</td>
                      <td className="py-3 px-4"><Badge variant="warning">No Pathway</Badge></td>
                      <td className="py-3 px-4 text-[var(--success)] font-mono">$50</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[var(--text-primary)] font-medium">TNF Inhibitors</td>
                      <td className="py-3 px-4 text-[var(--text-body)]">Biosimilar</td>
                      <td className="py-3 px-4"><Badge variant="danger">Abandoned</Badge></td>
                      <td className="py-3 px-4 text-[var(--success)] font-mono">$200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}

// Helper Components for Showcase

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading level={2} className="mb-8">{children}</Heading>
  );
}

function ColorSwatch({ name, color, hex, dark }: { name: string; color: string; hex: string; dark?: boolean }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border)]">
      <div
        className="h-20 flex items-end p-3"
        style={{ backgroundColor: `var(${color.replace('var(', '').replace(')', '')})` }}
      >
        <span className={`text-xs font-mono ${dark ? 'text-white' : 'text-[var(--text-body)]'}`}>
          {hex}
        </span>
      </div>
      <div className="p-3 bg-white">
        <p className="text-sm font-medium text-[var(--text-primary)]">{name}</p>
      </div>
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'amyloid' | 'vascular' | 'metabolic' | 'lysosomal';
}

function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-[var(--bg-secondary)] text-[var(--text-body)] border-[var(--border)]',
    primary: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border-[var(--accent-orange)]',
    success: 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    warning: 'bg-amber-50 text-amber-700 border-amber-300',
    danger: 'bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]',
    amyloid: 'bg-blue-50 text-[var(--category-amyloid)] border-[var(--category-amyloid)]',
    vascular: 'bg-purple-50 text-[var(--category-vascular)] border-[var(--category-vascular)]',
    metabolic: 'bg-yellow-50 text-[var(--category-metabolic)] border-[var(--category-metabolic)]',
    lysosomal: 'bg-green-50 text-[var(--category-lysosomal)] border-[var(--category-lysosomal)]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
}

function Alert({ children, variant = 'info' }: AlertProps) {
  const variantClasses = {
    info: 'bg-blue-50 text-[var(--category-amyloid)] border-[var(--category-amyloid)]',
    success: 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    warning: 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] border-[var(--accent-orange)]',
    danger: 'bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]',
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${variantClasses[variant]}`}>
      {children}
    </div>
  );
}

interface StatDisplayProps {
  value: string;
  label: string;
  highlight?: boolean;
}

function StatDisplay({ value, label, highlight }: StatDisplayProps) {
  return (
    <div className="text-center">
      <div className={`text-2xl md:text-3xl font-bold font-serif ${highlight ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>
        {value}
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
    </div>
  );
}
