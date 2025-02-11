// components/auth/RequireAuth.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push(`/auth/signin?redirect=${pathname}`);
        }
    }, [session, status, router, pathname]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return session ? <>{children}</> : null;
}
