import React, { CSSProperties } from 'react';

import clsx from 'clsx';

import px from '@lib/to-pixels';

interface SkeletonProps {
  show?: boolean;
  block?: boolean;
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  boxHeight?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  style,
  width,
  height,
  children,
  className,
  show = true,
  boxHeight = height,
}) => {
  // Automatically calculate the size if there are children
  // and no fixed sizes are specified
  const shouldAutoSize = !!children && !(width || height);

  // Defaults
  width = width || 24;
  height = height || 24;
  boxHeight = boxHeight || height;

  return (
    <span
      className={clsx(
        'animate-pulse bg-gradient-to-r from-gray-200 to-gray-300',
        'dark:from-gray-800  dark:to-gray-700',
        className
      )}
      style={
        shouldAutoSize
          ? {}
          : {
              minWidth: px(width),
              minHeight: px(height),
              marginBottom: `calc(${px(boxHeight)} - ${px(height)})`,
              ...style,
            }
      }
    >
      {children}
    </span>
  );
};

export default Skeleton;
