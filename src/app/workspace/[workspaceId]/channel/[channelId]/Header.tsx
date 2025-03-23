import { FaCaretDown } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

export interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title } = props;
  return (
    <div className='__Header bg-white border-b h-[49px] flex items-center px-4 overflow-hidden'>
      <Button
        variant={'ghost'}
        className='text-lg font-semibold px-2 overflow-hidden w-auto'
        size={'sm'}
      >
        <span className='truncate'># {title}</span>
        <FaCaretDown className='ml-2 size-2.5' />
      </Button>
    </div>
  );
};
