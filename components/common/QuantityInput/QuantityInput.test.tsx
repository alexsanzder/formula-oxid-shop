import QuantityInput from '@components/common/QuantityInput';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Topbar', () => {
  it('should render quantity input', () => {
    render(<QuantityInput />);
    expect(screen.getByText('1'));
    const minusButton = screen.getByRole('button', { name: '-' });
    const plusButton = screen.getByRole('button', { name: '+' });
    expect(minusButton).toBeDisabled();

    user.click(plusButton);
    expect(screen.getByText('2'));
    expect(minusButton).not.toBeDisabled();

    user.click(minusButton);
    expect(screen.getByText('1'));
    expect(minusButton).toBeDisabled();
  });
});
