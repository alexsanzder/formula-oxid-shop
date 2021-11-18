import StarRating from '@components/ui/StarRating';
import { render, screen } from '@testing-library/react';

describe('StarRating', () => {
  it('should render 5 stars and have 1 star rating', () => {
    const { container } = render(<StarRating count={1} />);

    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(container.getElementsByClassName('text-yellow-400')).toHaveLength(1);
  });
});
