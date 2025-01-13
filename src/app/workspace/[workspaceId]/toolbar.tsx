import { Search, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = (props: ToolbarProps) => {
  return (
    <nav className='__toolbar bg-[#481349] flex items-center justify-between h-10 p-1.5 text-white'>
      <div className='flex-1' />
      <div className='min-w-[280px] max-w-[642px] grow-[2] shrink'>
        <Button size={'sm'} className='bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2'>
          <Search className='size-4 text-white mr-2' />
          <span className='text-white text-xs'>Search Workspaces</span>
        </Button>
      </div>
      <div className='ml-auto flex flex-1 items-center justify-end'>
        <Button variant={'ghost'} className='bg-accent/25 hover:bg-accent/25'>
          <Info className='size-5 text-white' />
        </Button>
      </div>
    </nav>
  );
};

export default Toolbar;
