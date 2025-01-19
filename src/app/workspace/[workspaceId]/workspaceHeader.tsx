import { ChevronDown, ListFilter, SquarePen } from 'lucide-react';
import { useState } from 'react';

import { Hit } from '@/components/hit';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { Doc } from '../../../../convex/_generated/dataModel';
import { PreferencesModal } from './preferencesModal';

export interface WorkspaceHeaderProps {
  workspaceItem: Doc<'workspaces'>;
  isAdmin: boolean;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ workspaceItem, isAdmin }: WorkspaceHeaderProps) => {
  const [openPreferences, setOpenPreferences] = useState(false);
  return (
    <>
      <PreferencesModal open={openPreferences} setOpen={setOpenPreferences} initialValue={workspaceItem?.name} />
      <div className='__workspaceHeader flex items-center justify-between px-4 h-[49px] gap-0.5'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'transparent'} className='font-semibold text-lg w-auto p-1.5 overflow-hidden' size={'sm'}>
              <span className='truncate max-w-[200px]'>{workspaceItem?.name}</span>
              <ChevronDown className='size-4 ml-1 shrink-0' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' side='bottom' className='w-64'>
            <DropdownMenuItem className='cursor-pointer capitalize' key={workspaceItem?._id}>
              <div className='size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center'>
                {workspaceItem?.name.charAt(0).toUpperCase()}
              </div>
              <div className='flex flex-col items-start'>
                <p className='font-bold'>{workspaceItem.name}</p>
                <p className='text-xs text-muted-foreground'>Active workspace</p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer py-2' onClick={() => {}}>
                  Invite people to {workspaceItem.name}
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer py-2' onClick={() => setOpenPreferences(true)}>
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='flex items-center gap-0.5'>
          <Hit label='Filter conversations' side='bottom'>
            <Button variant={'transparent'} size={'iconSm'}>
              <ListFilter className='size-4' />
            </Button>
          </Hit>
          <Hit label='New message' side='bottom'>
            <Button variant={'transparent'} size={'iconSm'}>
              <SquarePen className='size-4' />
            </Button>
          </Hit>
        </div>
      </div>
    </>
  );
};
