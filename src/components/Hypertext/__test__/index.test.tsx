import Hypertext from '../index';
import renderer from 'react-test-renderer';

describe('Hypertext Block', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Hypertext />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
