import { NextPage } from 'next';
import styled from 'styled-components';
import TextFieldComponent from '../../components/Textfield';
import Typography from '../../components/Typography';

const PageHeader = styled.section`
  display: flex;
`;

const Section = styled.section``;

const SectionHeaderContent = styled.div``;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterDropdown = styled.div``;

const Cards = styled.div`
  display: flex;
  flex-basis: 30%;
`;

const OverviewCard = styled.div`
  border-radius: 10px;
  border: 1px solid #dbe3eb;
  padding: 2rem;
  margin-right: 2rem;
`;

const CardPeriod = styled.div`
  display: flex;
`;

const Dashboard: NextPage = () => {
  const overviewCards = [
    {
      label: 'Total number of transactions',
      value: '984',
      totalValue: '8,760',
      period: 'all time',
      icon: '',
    },
    {
      label: 'Total transaction value',
      value: '£1,000,400',
      totalValue: '£15,800,540',
      period: 'all time',
      icon: '',
    },
    {
      label: 'Average transaction value',
      value: '£650.00',
      totalValue: '£683.00',
      period: 'all time',
      icon: '',
    },
    {
      label: 'Average number of transactions',
      value: '74',
      totalValue: '72',
      period: 'all time',
      icon: '',
    },
    {
      label: 'Average transaction volume',
      value: '£48,100',
      totalValue: '£62,100',
      period: 'all time',
      icon: '',
    },
    {
      label: 'Fees charged by Fena',
      value: '£216.48',
      totalValue: '£1,927.20',
      period: 'all time',
      icon: '',
    },
    {
      label: 'Number of active merchants',
      value: '1200',
      totalValue: '1200',
      period: 'all time',
      icon: '',
    },
    {
      label: 'Number of inactive merchants',
      value: '12',
      totalValue: '30',
      period: 'all time',
      icon: '',
    },
  ];
  return (
    <>
      <PageHeader>
        <Typography variant="h3">Dashboard</Typography>
        <TextFieldComponent />
      </PageHeader>
      <Section>
        <SectionHeader>
          <SectionHeaderContent>
            <Typography variant="subtitle4">Overview</Typography>
            <Typography variant="body1">
              Headline figures for all merchants. Shows selected timeframe and
              all time
            </Typography>
          </SectionHeaderContent>

          <FilterDropdown>
            <Typography variant="body4">Period</Typography>
          </FilterDropdown>
        </SectionHeader>
        <Cards>
          {overviewCards.map((el) => {
            return (
              <OverviewCard key={el.label}>
                <Typography variant="body4">{el.label}</Typography>
                <Typography variant="subtitle4">{el.value}</Typography>
                <CardPeriod>
                  <Typography variant="body4">
                    {el.totalValue}
                    {' '}
                  </Typography>

                  <Typography variant="body4">{el.period}</Typography>
                </CardPeriod>
              </OverviewCard>
            );
          })}
        </Cards>
      </Section>
    </>
  );
};

export default Dashboard;
