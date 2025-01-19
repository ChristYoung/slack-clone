'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface HitProps {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export const Hit: React.FC<HitProps> = ({ label, children, side = 'top', align = 'center' }: HitProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} className='bg-black text-white border border-white/5'>
          <p className='font-medium text-xs'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
