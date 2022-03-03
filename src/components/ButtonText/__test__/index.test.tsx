import ButtonText from '../index';
import renderer from 'react-test-renderer';

describe('Button Block', () => {
  it('renders correctly with variant contained ', () => {
    const tree = renderer
      .create(<ButtonText variant={`contained`}>Submit</ButtonText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with variant outlined ', () => {
    const tree = renderer
      .create(<ButtonText variant={`outlined`}>Submit</ButtonText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with variant outlined disabled', () => {
    const tree = renderer
      .create(<ButtonText variant={`outlined`}>Submit</ButtonText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with variant contained disabled', () => {
    const tree = renderer
      .create(<ButtonText variant={`outlined`}>Submit</ButtonText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
