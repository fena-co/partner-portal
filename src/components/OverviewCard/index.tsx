import Image from 'next/image';
import styled from 'styled-components';
import Typography from '../Typography';

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid #dbe3eb;
  padding: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
`;

const CardPeriod = styled.div`
  display: flex;
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

const OverviewCard = ({ props }: OverviewCardProps) => {
  return (
    <Container key={props.label}>
      {/* <Image src={props.icon} layout='fill' alt="card icon" /> */}
      <Typography variant="body4">{props.label}</Typography>
      <Typography variant="subtitle4">{props.value}</Typography>
      <CardPeriod>
        <Typography variant="body4">{props.totalValue} </Typography>

        <Typography variant="body4">{props.period}</Typography>
      </CardPeriod>
    </Container>
  );
};

export default OverviewCard;
