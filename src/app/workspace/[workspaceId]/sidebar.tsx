'use client';

import { Home } from 'lucide-react';

import { UserBtn } from '@/features/auth/components/UserBtn';

import SidebarBtn from './sidebarBtn';
import WorkspaceSwitcher from './workspaceSwitcher';

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  return (
    <aside className='__sidebar w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4 pr-3 pl-3'>
      <WorkspaceSwitcher />
      <SidebarBtn icon={Home} label='Home' active />
      <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>
        <UserBtn />
      </div>
    </aside>
  );
};

export default Sidebar;
