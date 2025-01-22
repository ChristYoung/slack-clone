import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Id } from '../../../../convex/_generated/dataModel';

export interface UserItemProps {
  id: Id<'members'>;
  label: string | undefined;
  image: string | undefined;
  workspaceId: Id<'workspaces'>;
  variant?: VariantProps<typeof userItemVariants>['variant'];
}

const userItemVariants = cva(
  'flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'text-[#481349] bg-white/90 hover:bg-white/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const UserItem: React.FC<UserItemProps> = (props: UserItemProps) => {
  const { id, label = 'Member', image, variant, workspaceId } = props;
  return (
    <Button
      className={cn(userItemVariants({ variant }))}
      size={'sm'}
      variant={'transparent'}
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className='size-5 mr-1 rounded-md'>
          <AvatarImage className='rounded-md' src={image} alt={label} />
          <AvatarFallback className='rounded-md bg-sky-500 text-white text-xs'>
            {label?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className='text-sm truncate'>{label}</span>
      </Link>
    </Button>
  );
};
