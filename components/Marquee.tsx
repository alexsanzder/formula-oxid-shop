import { Children, Component, FC, ReactNode } from 'react';
import { default as FastMarquee } from 'react-fast-marquee';

interface MarqueeProps {
  className: string;
  children?: ReactNode[] | Component[] | any[];
  gradient: boolean;
}

const Marquee: FC<MarqueeProps> = ({ className, gradient = true, children }) => {
  return (
    <FastMarquee className={className} gradient={gradient}>
      {Children.map(children, (child) => ({
        ...child,
        props: {
          ...child.props,
        },
      }))}
    </FastMarquee>
  );
};

export default Marquee;
