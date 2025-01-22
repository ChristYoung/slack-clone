import { PlusIcon } from 'lucide-react';
import { FaCaretDown } from 'react-icons/fa';
import { useToggle } from 'react-use';

import { Hit } from '@/components/hit';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface WorkspaceSectionProps {
  label: string;
  hint: string;
  children: React.ReactNode;
  onNew?: () => void;
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = (props: WorkspaceSectionProps) => {
  const { label, hint, children, onNew } = props;
  const [on, toggle] = useToggle(true);
  return (
    <div className='__workspaceSection flex flex-col mt-3 px-2'>
      <div className='flex items-center px-3.5 group'>
        <Button
          variant={'transparent'}
          onClick={toggle}
          className='p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6'
        >
          <FaCaretDown className={cn('size-4 transition-transform', !on && '-rotate-90')} />
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
      {on && children}
    </div>
  );
};
