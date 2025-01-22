import { FaCaretDown } from 'react-icons/fa';

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
    <div className='__workspaceSection flex flex-col mt-3'>
      <div className='flex items-center px-3.5 group'>
        <Button variant={'transparent'} className='p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6'>
          <FaCaretDown className='size-4' />
        </Button>
        <Button
          variant={'transparent'}
          size={'sm'}
          className='group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center'
        >
          <span className='text-sm font-semibold'>{label}</span>
        </Button>
      </div>
      {children}
    </div>
  );
};
