import styled from 'styled-components';
import Typography from '../Typography';

const Container = styled.div``;

const Item = styled.div`
  display: flex;
`;

interface MerchantChart {
  props: {
    company: string;
    value: string;
  };
}

const MerchantChart = ({ props }: MerchantChart) => {
  console.log(props);
  return (
    <Item>
      <Typography variant="body4">{props.company}</Typography>
      <Typography variant="body5">{props.value}</Typography>
    </Item>
  );
};

export default MerchantChart;
