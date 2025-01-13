import { UserBtn } from '@/features/auth/components/UserBtn';

import WorkspaceSwitcher from './workspaceSwitcher';

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  return (
    <aside className='__sidebar w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4'>
      <WorkspaceSwitcher />
      <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>
        <UserBtn />
      </div>
    </aside>
  );
};

export default Sidebar;