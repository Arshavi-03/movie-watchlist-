import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { AuthProvider } from '../components/providers/AuthProvider';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MovieWatch - Your Personal Movie Watchlist',
  description: 'Keep track of your favorite movies and discover new ones',
  keywords: ['movies', 'watchlist', 'cinema', 'films', 'tracking'],
  authors: [{ name: 'MovieWatch Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#121212]`}>
        <AuthProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}