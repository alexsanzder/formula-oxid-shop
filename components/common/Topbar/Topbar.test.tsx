import Topbar from '@components/common/Topbar';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Topbar', () => {
  it('should render topbar and dismiss it', () => {
    render(<Topbar />);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Dismiss topbar/i }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
