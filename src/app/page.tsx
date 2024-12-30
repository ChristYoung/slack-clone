'use client';

import { useAuthActions } from '@convex-dev/auth/react';

import { UserBtn } from '@/features/auth/components/UserBtn';

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div>
      Logged in!
      <UserBtn></UserBtn>
    </div>
  );
}
