import Button from '../index';
import renderer from 'react-test-renderer';

describe('Button Block', () => {
  it('renders correctly with variant contained ', () => {
    const tree = renderer
      .create(<Button variant={`contained`}>Submit</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with variant outlined ', () => {
    const tree = renderer
      .create(<Button variant={`outlined`}>Submit</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
