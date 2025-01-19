import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Doc } from '../../../../convex/_generated/dataModel';

export const WorkspaceHeader: React.FC<{ workspaceItem: Doc<'workspaces'> }> = ({
  workspaceItem,
}: {
  workspaceItem: Doc<'workspaces'>;
}) => {
  return (
    <div className='__workspaceHeader flex items-center justify-between px-4 h-[49px] gap-0.5'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'transparent'} className='font-semibold text-lg w-auto p-1.5 overflow-hidden' size={'sm'}>
            <span className='truncate max-w-[200px]'>{workspaceItem?.name}</span>
            <ChevronDown className='size-4 ml-1 shrink-0' />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};
