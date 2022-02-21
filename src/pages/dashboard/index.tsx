import { NextPage } from 'next';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import TextFieldComponent from '../../components/Textfield';
import Typography from '../../components/Typography';
import graySum from '../../../public/image/icon/graySum.svg';
import OverviewCard from '../../components/OverviewCard';
import MerchantChart from '../../components/MerchantChart';

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
`;

const H3 = styled(Typography)`
  margin-right: 5rem;
`;

const FirstViewport = styled.section`
  margin-bottom: 2rem;
`;

const ViewportHeaderContent = styled.div``;

const ViewportHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterDropdown = styled.div``;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SecondViewport = styled(FirstViewport)``;

const ThirdViewport = styled(FirstViewport)``;

const Chart = styled.div``;

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

  const transactionChartData = {
    byAverageTransactionValue: [
      { company: 'Allies Computing Ltd.', value: '1,450' },
      { company: 'Anglo American Plc.', value: '1,380' },
      { company: 'Antofagasta Plc.', value: '1,100' },
      { company: 'Ashtead Group Plc.', value: '1,050' },
      { company: 'Antofagasta Plc.', value: '980' },
    ],
    byNumberOfTransactions: [
      { company: '', value: '' },
      { company: '', value: '' },
      { company: '', value: '' },
      { company: '', value: '' },
      { company: '', value: '' },
    ],
    byTransactionVolume: [
      { company: '', value: '' },
      { company: '', value: '' },
      { company: '', value: '' },
      { company: '', value: '' },
      { company: '', value: '' },
    ],
  };
  return (
    <Layout
      menuItems={[
        {
          menuName: 'Invoices',
          pathName: '',
        },
        {
          menuName: 'Pay by Link',
          pathName: '',
        },
        {
          menuName: 'QR code payments',
          pathName: '',
        },
      ]}
    >
      <PageHeader>
        <H3 variant="h3">Dashboard</H3>
        <TextFieldComponent
          inputProps={{
            placeholder: 'Search',
            type: 'text',
          }}
        />
      </PageHeader>
      <FirstViewport>
        <ViewportHeader>
          <ViewportHeaderContent>
            <Typography variant="subtitle4">Overview</Typography>
            <Typography variant="body1">
              Headline figures for all merchants. Shows selected timeframe and
              all time
            </Typography>
          </ViewportHeaderContent>

          <FilterDropdown>
            <Typography variant="body4">Period:</Typography>
          </FilterDropdown>
        </ViewportHeader>
        <Cards>
          {overviewCards.map((el) => {
            return (
              <OverviewCard
                key={el.label}
                props={{
                  label: el.label,
                  value: el.value,
                  totalValue: el.totalValue,
                  period: el.period,
                  icon: el.icon,
                }}
              />
            );
          })}
        </Cards>
      </FirstViewport>

      <SecondViewport>
        <ViewportHeader>
          <ViewportHeaderContent>
            <Typography variant="subtitle4">Transactions by size</Typography>
            <Typography variant="body1">
              Please filter by merchant(s) and timeframe
            </Typography>
            <TextFieldComponent
              inputProps={{
                placeholder: 'Search merchant',
                type: 'text',
              }}
            />
          </ViewportHeaderContent>
          <FilterDropdown>
            <Typography variant="body4">Period:</Typography>
          </FilterDropdown>
        </ViewportHeader>
      </SecondViewport>

      <ThirdViewport>
        <ViewportHeader>
          <ViewportHeaderContent>
            <Typography variant="subtitle4">Top 5 merchants</Typography>
          </ViewportHeaderContent>
          <FilterDropdown>
            <Typography variant="body4">Period:</Typography>
          </FilterDropdown>
        </ViewportHeader>
        <Chart>
          <Typography variant="subtitle5">
            By average transaction value{' '}
          </Typography>
          {transactionChartData.byAverageTransactionValue.map((el) => {
            return (
              <MerchantChart key={el.company} props={{ company: el.company, value: el.value }} />
            );
          })}
        </Chart>
      </ThirdViewport>
    </Layout>
  );
};

export default Dashboard;
