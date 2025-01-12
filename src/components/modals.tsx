'use client';

import { useEffect, useState } from 'react';

import { CreateWorkspaceModal } from '@/features/workspaces/components/CreateWorkspaceModal';

export const Modals: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};