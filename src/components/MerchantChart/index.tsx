import styled from 'styled-components';
import Typography from '../Typography';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #dbe3eb;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 500ms;
  &:hover {
    background-color: #f4f7f9;
  }
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 15%;
`;

const Dot = styled.div`
  border-radius: 50%;
  background-color: ${(props) =>
    !props['aria-atomic']
      ? `#EF6355`
      : `
 #2cd19e`};
  padding: 0.2rem;
  margin-right: 0.5rem;
`;

interface MerchantChart {
  props: {
    name: string;
    company: string;
    value: string;
  };
  isGreen?: boolean;
}

const MerchantChart = ({ props, isGreen }: MerchantChart) => {
  return (
    <Item>
      <Typography variant="body4">{props.company}</Typography>
      <Value>
        <Dot aria-atomic={isGreen} />
        <Typography variant="body5">{props.value}</Typography>
      </Value>
    </Item>
  );
};

export default MerchantChart;
