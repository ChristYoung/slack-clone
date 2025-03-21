'use client';

import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VerificationInput from 'react-verification-input';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useGetWorkspaceInfoByIdApi } from '@/features/workspaces/apis/useGetWorkspaceInfoByIdApi';
import { useJoinApi } from '@/features/workspaces/apis/useJoin';
import { cn } from '@/lib/utils';

import { Id } from '../../../../convex/_generated/dataModel';

export interface PageProps {
  params: {
    workspaceId: Id<'workspaces'>;
  };
}

const JoinPage: React.FC<PageProps> = (props: PageProps) => {
  const { workspaceId } = props?.params;
  const router = useRouter();
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceInfoByIdApi({ id: workspaceId });
  const { mutate, isPending } = useJoinApi();

  const handleJoin = (joinCode: string) => {
    mutate(
      { workspaceId, joinCode },
      {
        onSuccess: (id: Id<'workspaces'> | undefined) => {
          router.replace(`/workspace/${id}`);
          toast.success('Successfully joined workspace');
        },
        onError: (_error) => {
          toast.error('failed to join workspace');
        },
      }
    );
  };

  if (isLoadingWorkspace) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Loader className='size-6 animate-spin text-foreground' />
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md'>
      <Image src='/next.svg' width={60} height={60} alt='logo' />
      <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
        <div className='flex flex-col gap-y-2 items-center justify-center'>
          <h1 className='text-2xl font-bold text-center'>Join {workspaceItem?.name}</h1>
          <p className='text-md text-muted-foreground'>Enter the workspace code to join</p>
        </div>
        <VerificationInput
          onComplete={handleJoin}
          length={6}
          autoFocus
          classNames={{
            container: cn('flex gap-x-2', isPending && 'opacity-50 cursor-not-allowed'),
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
          <Link href='/'>Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
