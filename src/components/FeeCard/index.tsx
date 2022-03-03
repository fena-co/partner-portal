import styled from 'styled-components';
import Typography from '../Typography';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 30%;
  &:nth-child(1n) {
    &:after {
      content: 'x';
      font-weight: bold;
      font-size: 20px;
      padding: 2rem;
    }
  }
  &:nth-child(2n) {
    &:after {
      content: '=';
      font-weight: bold;
      font-size: 20px;
    }
  }
  &:nth-child(3n) {
    &:after {
      content: none;
    }
  }
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #dbe3eb;
  padding: 2rem;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Subtitle4 = styled(Typography)`
  font-weight: bold;
`;

const CardPeriod = styled.div`
  display: flex;
  align-items: center;
`;

interface OverviewCardProps {
  props: {
    label: string;
    value: string;
    totalValue: string;
    period: string;
    icon: string;
  };
}

const FeeCard = ({ props }: OverviewCardProps) => {
  return (
    <Wrapper>
      <Container key={props.label}>
        <CardHeader>
          <Typography variant="body4">{props.label}</Typography>
          <img src={props.icon} width="50px" height="50px" alt="card icon" />
        </CardHeader>

        <Subtitle4 variant="subtitle4">{props.value}</Subtitle4>
        <CardPeriod>
          <Typography variant="body1">{props.totalValue}</Typography>
          &nbsp;
          <Typography variant="body4">{props.period}</Typography>
        </CardPeriod>
      </Container>
    </Wrapper>
  );
};

export default FeeCard;
