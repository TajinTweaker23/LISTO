const { render } = require('@testing-library/react');
const Explore = require('../pages/explore');

test('renders explore component', () => {
  const { getByText } = render(<Explore />);
  const linkElement = getByText(/explore/i);
  expect(linkElement).toBeInTheDocument();
});