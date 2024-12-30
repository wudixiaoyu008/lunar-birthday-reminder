import { Providers } from './providers';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-8">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
