import Image from 'next/image';
import styled from 'styled-components';
import Typography from '../Typography';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #dbe3eb;
  padding: 2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: 500ms;
  &:hover {
    box-shadow: 0px 12px 30px rgba(129, 129, 165, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled(Image)``;

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
    iconsDisabled?: boolean;
  };
}

const OverviewCard = ({ props }: OverviewCardProps) => {
  return (
    <Container key={props.label}>
      <CardHeader>
        <Typography variant="body4">{props.label}</Typography>
        {!props.iconsDisabled && (
          <Icon
            aria-disabled={props.iconsDisabled}
            src={props.icon}
            width="50px"
            height="50px"
            alt="card icon"
          />
        )}
      </CardHeader>

      <Subtitle4 variant="subtitle4">{props.value}</Subtitle4>
      <CardPeriod>
        <Typography variant="body1">{props.totalValue}</Typography>
        &nbsp;
        <Typography variant="body4">{props.period}</Typography>
      </CardPeriod>
    </Container>
  );
};

export default OverviewCard;
