import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coy — Privacy-First Crush & Discovery Matching',
  description: 'Double-blind mutual crush and swipe-based discovery tab for Coy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f1115] text-[#141416] min-h-screen flex items-center justify-center p-0 sm:p-4">
        {children}
      </body>
    </html>
  );
}

