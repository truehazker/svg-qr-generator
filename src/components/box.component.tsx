import React from 'react';
import { cn } from '../lib/utils.lib';

export const Box = (props: React.HTMLProps<HTMLDivElement>) => {
  const { children, className, ...rest } = props;
  return (
    <div className={cn('flex flex-col gap-2 bg-white rounded-lg p-4 border', className)} {...rest}>
      {children}
    </div>
  );
};
