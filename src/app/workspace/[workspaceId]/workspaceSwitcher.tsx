'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface WorkspaceSwitcherProps {}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = (props: WorkspaceSwitcherProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='__DropdownMenuTrigger'>
        <Button className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'>
          A
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <DropdownMenuItem className='__DropdownMenuItem'>Workspace 1</DropdownMenuItem>
        <DropdownMenuItem className='__DropdownMenuItem'>Workspace 2</DropdownMenuItem>
        <DropdownMenuItem className='__DropdownMenuItem'>Workspace 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
