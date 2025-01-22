import { PlusIcon } from 'lucide-react';
import { FaCaretDown } from 'react-icons/fa';

import { Hit } from '@/components/hit';
import { Button } from '@/components/ui/button';

export interface WorkspaceSectionProps {
  label: string;
  hint: string;
  children: React.ReactNode;
  onNew?: () => void;
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = (props: WorkspaceSectionProps) => {
  const { label, hint, children, onNew } = props;
  return (
    <div className='__workspaceSection flex flex-col mt-3 px-2'>
      <div className='flex items-center px-3.5 group'>
        <Button variant={'transparent'} className='p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6'>
          <FaCaretDown className='size-4' />
        </Button>
        <Button
          variant={'transparent'}
          size={'sm'}
          className='group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center'
        >
          <span className='truncate'>{label}</span>
        </Button>
        {onNew && (
          <Hit label={hint} side='top' align='center'>
            <Button
              onClick={onNew}
              variant={'transparent'}
              size={'iconSm'}
              className='opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6'
            >
              <PlusIcon className='size-5' />
            </Button>
          </Hit>
        )}
      </div>
      {children}
    </div>
  );
};
