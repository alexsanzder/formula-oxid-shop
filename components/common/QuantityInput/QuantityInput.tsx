import { useState } from 'react';

import clsx from 'clsx';

const QuantityInput = () => {
  const [amount, setAmount] = useState(1);

  return (
    <div className="rounded-3 flex justify-around w-20 py-4 text-sm border border-gray-300 rounded-sm">
      <button
        className={clsx(
          amount === 1 ? 'dark:text-white text-gray-200' : 'dark:text-white text-black'
        )}
        tabIndex={0}
        disabled={amount === 1}
        onClick={() => setAmount(amount - 1)}
      >
        -
      </button>
      <span>{amount}</span>
      <button
        className="dark:text-white text-black"
        tabIndex={0}
        onClick={() => setAmount(amount + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
