import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

import { Button } from '@/components/ui/button';

import { Id } from '../../../../convex/_generated/dataModel';

const sideBarItemVariants = cva(
  'flex items-center gap-1.5 justify-center font-normal h-7 px-[18px] text-sm overflow-hidden',
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

export interface SideBarItemProps {
  label: string;
  icon: LucideIcon | IconType;
  id: string;
  workspaceId: Id<'workspaces'>;
  variant?: VariantProps<typeof sideBarItemVariants>['variant'];
}

export const SideBarItem: React.FC<SideBarItemProps> = ({
  label,
  icon: Icon,
  id,
  workspaceId,
}: SideBarItemProps) => {
  return (
    <Button asChild variant={'transparent'} size={'sm'}>
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon />
        <span>{label}</span>
      </Link>
    </Button>
  );
};
