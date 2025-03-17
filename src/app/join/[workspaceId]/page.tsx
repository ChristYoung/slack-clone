'use client';

import Image from 'next/image';
import Link from 'next/link';
import VerificationInput from 'react-verification-input';

import { Button } from '@/components/ui/button';

export interface PageProps {
  params: {
    workspaceId: string;
  };
}

const JoinPage: React.FC<PageProps> = (props: PageProps) => {
  const { workspaceId } = props?.params;
  return (
    <div className='h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md'>
      <Image src='/next.svg' width={60} height={60} alt='logo' />
      <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
        <div className='flex flex-col gap-y-2 items-center justify-center'>
          <h1 className='text-2xl font-bold text-center'>Join Workspace</h1>
          <p className='text-md text-muted-foreground'>Enter the workspace code to join</p>
        </div>
        <VerificationInput
          length={6}
          autoFocus
          classNames={{
            container: 'flex gap-x-2',
            character:
              'uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500',
            characterInactive: 'bg-muted',
            characterSelected: 'bg-white text-black',
            characterFilled: 'bg-white text-black',
          }}
        />
      </div>
      <div className='flex gap-x-4'>
        <Button size={'lg'} variant={'outline'} asChild>
          <Link href=''>Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
