import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'sold-out' | 'category';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
                    {
                        'bg-gold/20 text-gold border border-gold/30': variant === 'default',
                        'bg-tomato/20 text-tomato border border-tomato/30': variant === 'sold-out',
                        'bg-navy-light/50 text-gray-300 border border-gray-700': variant === 'category',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';

export { Badge };
