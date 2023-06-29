import './globals.css';
import { Raleway } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { MainNav } from '@/components/main-nav';
import { cn } from '@/utils';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata = {
	title: 'Fantasy Netball',
	description: 'Created by Tim Veletta',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={cn(raleway.className, 'min-h-screen')}>
					<MainNav />
					<main>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
