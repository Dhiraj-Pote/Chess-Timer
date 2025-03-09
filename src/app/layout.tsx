import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chess Timer App',
  description: 'A simple and attractive chess timer application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
