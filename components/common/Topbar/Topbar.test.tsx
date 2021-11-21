import Topbar from '@components/common/Topbar';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Topbar', () => {
  it('should render topbar and dismiss it', () => {
    render(<Topbar />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    user.click(screen.getByRole('button', { name: /dismiss topbar/i }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
