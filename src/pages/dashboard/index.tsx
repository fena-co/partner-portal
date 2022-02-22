import { NextPage } from 'next';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import TextFieldComponent from '../../components/Textfield';
import Typography from '../../components/Typography';
import graySum from '/image/icon/graySum.svg';
import OverviewCard from '../../components/OverviewCard';
import MerchantChart from '../../components/MerchantChart';
import FeeCard from '../../components/FeeCard';
import Image from 'next/image';

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
`;

const TitleAndImage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const H3 = styled(Typography)`
  margin-right: 5rem;
`;

const Subtitle4 = styled(Typography)`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle4NoMargin = styled(Subtitle4)`
  margin-bottom: 0;
  margin-left: 1rem;
`;

const Subtitle5 = styled(Typography)`
  margin-bottom: 1rem;
`;

const Body1 = styled(Typography)`
  margin-bottom: 1rem;
`;

const FirstViewport = styled.section`
  margin-bottom: 3rem;
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

const FeeCards = styled(Cards)``;

const SecondViewport = styled(FirstViewport)``;

const ThirdViewport = styled(FirstViewport)``;

const Chart = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ChartColumns = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  margin-right: 1rem;
`;

const FourthViewport = styled(FirstViewport)``;

const FifthViewport = styled(FirstViewport)`
  padding: 3rem 2rem;
  background-color: #f4f7f9;
  border-radius: 10px;
`;

const Dashboard: NextPage = () => {
  const overviewCards = [
    {
      label: 'Total number of transactions',
      value: '984',
      totalValue: '8,760',
      period: 'all time',
      icon: '/image/icon/graySum.svg',
    },
    {
      label: 'Total transaction value',
      value: '£1,000,400',
      totalValue: '£15,800,540',
      period: 'all time',
      icon: '/image/icon/greenDollar.svg',
    },
    {
      label: 'Average transaction value',
      value: '£650.00',
      totalValue: '£683.00',
      period: 'all time',
      icon: '/image/icon/blueSum.svg',
    },
    {
      label: 'Average number of transactions',
      value: '74',
      totalValue: '72',
      period: 'all time',
      icon: '/image/icon/blueSum.svg',
    },
    {
      label: 'Average transaction volume',
      value: '£48,100',
      totalValue: '£62,100',
      period: 'all time',
      icon: '/image/icon/yellowDollar.svg',
    },
    {
      label: 'Fees charged by Fena',
      value: '£216.48',
      totalValue: '£1,927.20',
      period: 'all time',
      icon: '/image/icon/grayPerсent.svg',
    },
    {
      label: 'Number of active merchants',
      value: '1200',
      totalValue: '1200',
      period: 'all time',
      icon: '/image/icon/greenAcception.svg',
    },
    {
      label: 'Number of inactive merchants',
      value: '12',
      totalValue: '30',
      period: 'all time',
      icon: '/image/icon/redRejection.svg',
    },
  ];

  const transactionChartData = [
    {
      name: 'By average transaction value ',
      items: [
        { company: 'Allies Computing Ltd.', value: '1,450' },
        { company: 'Anglo American Plc.', value: '1,380' },
        { company: 'Antofagasta Plc.', value: '1,100' },
        { company: 'Ashtead Group Plc.', value: '1,050' },
        { company: 'Antofagasta Plc.', value: '980' },
      ],
    },
    {
      name: 'By number of transactions',
      items: [
        { company: 'Cineworld Group Plc', value: '1,987' },
        { company: 'CNH Industrial NV', value: '1,899' },
        { company: 'GlaxoSmithKline Plc', value: '1,100' },
        { company: 'HSBC Holdings Plc', value: '1,050' },
        { company: 'Antofagasta Plc.', value: '550' },
      ],
    },
    {
      name: 'By transaction volume',
      items: [
        { company: 'IHS Markit Ltd.', value: '21,489' },
        { company: 'Imperial Brands Plc', value: '20,786' },
        { company: 'Marks & Spencer Group Plc', value: '11,987' },
        { company: 'Nationwide Building Society', value: '10,500' },
        { company: 'NatWest Group Plc', value: '9,654' },
      ],
    },
  ];

  const feeCards = [
    {
      label: 'Total number of transactions',
      value: '201',
      totalValue: '640',
      period: 'all time',
      icon: '/image/icon/blueSum.svg',
    },
    {
      label: 'Fee per transaction',
      value: '£0.22',
      totalValue: '£0.22',
      period: 'all time',
      icon: '/image/icon/grayPerсent.svg',
    },
    {
      label: 'Total fee',
      value: '£44.22',
      totalValue: '£140.8',
      period: 'all time',
      icon: '/image/icon/greenDollar.svg',
    },
  ];
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
            <Subtitle4 variant="subtitle4">Overview</Subtitle4>
            <Body1 variant="body1">
              Headline figures for all merchants. Shows selected timeframe and
              all time
            </Body1>
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
            <Subtitle4 variant="subtitle4">Transactions by size</Subtitle4>
            <Body1 variant="body1">
              Please filter by merchant(s) and timeframe
            </Body1>
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
            <TitleAndImage>
              <Image
                src="/image/icon/greenArrowUp.svg"
                width="50px"
                height="50px"
                alt="card icon"
              />
              <Subtitle4NoMargin variant="subtitle4">
                Top 5 merchants
              </Subtitle4NoMargin>
            </TitleAndImage>
          </ViewportHeaderContent>
          <FilterDropdown>
            <Typography variant="body4">Period:</Typography>
          </FilterDropdown>
        </ViewportHeader>

        <Chart>
          {transactionChartData.map((el) => (
            <ChartColumns key={el.name}>
              <Subtitle5 variant="subtitle5" key={el.name}>
                {el.name}
              </Subtitle5>
              {el.items.map((item) => (
                <MerchantChart
                  key={item.value}
                  isGreen
                  props={{
                    name: el.name,
                    company: item.company,
                    value: item.value,
                  }}
                />
              ))}
            </ChartColumns>
          ))}
        </Chart>
      </ThirdViewport>

      <FourthViewport>
        <ViewportHeader>
          <ViewportHeaderContent>
            <TitleAndImage>
              <Image
                src="/image/icon/redArrowDown.svg"
                width="50px"
                height="50px"
                alt="card icon"
              />
              <Subtitle4NoMargin variant="subtitle4">
                Bottom 5 merchants
              </Subtitle4NoMargin>
            </TitleAndImage>
          </ViewportHeaderContent>
          <FilterDropdown>
            <Typography variant="body4">Period:</Typography>
          </FilterDropdown>
        </ViewportHeader>
        <Chart>
          {transactionChartData.map((el) => (
            <ChartColumns key={el.name}>
              <Subtitle5 variant="subtitle5" key={el.name}>
                {el.name}
              </Subtitle5>
              {el.items.map((item) => (
                <MerchantChart
                  key={item.value}
                  props={{
                    name: el.name,
                    company: item.company,
                    value: item.value,
                  }}
                />
              ))}
            </ChartColumns>
          ))}
        </Chart>
      </FourthViewport>

      <FifthViewport>
        <ViewportHeader>
          <ViewportHeaderContent>
            <Subtitle4 variant="subtitle4">Fees</Subtitle4>
            <Body1 variant="body1">Fees charged by fena</Body1>
            <Body1 variant="body1">
              £0.22 per transaction (average of between 1001 and 5000
              transactions per month)
            </Body1>
          </ViewportHeaderContent>
          <FilterDropdown>
            <Typography variant="body4">Period:</Typography>
          </FilterDropdown>
        </ViewportHeader>
        <FeeCards>
          {feeCards.map((el) => {
            return (
              <FeeCard
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
        </FeeCards>
      </FifthViewport>
    </Layout>
  );
};

export default Dashboard;
