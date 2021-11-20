import StarRating from '@components/ui/StarRating';
import { render, screen } from '@testing-library/react';

describe('StarRating', () => {
  it('should render 5 stars and have 1 star rating', () => {
    render(<StarRating count={1} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
    expect(buttons[0]).toHaveClass('text-yellow-400');
  });
});
