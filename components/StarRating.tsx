import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

interface StarRatingProps {
  className: string;
  count: number;
}
function StarRating({ className, count }: StarRatingProps) {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(count);
    return () => {
      setRating(0);
    };
  }, [count]);

  return (
    <div className={clsx('-ml-px', className)}>
      {[...Array(5)].map((_star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={clsx(index <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400')}
            // onClick={() => setRating(index)}
            // onMouseEnter={() => setHover(index)}
            // onMouseLeave={() => setHover(rating)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
