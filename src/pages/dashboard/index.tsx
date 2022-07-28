import GreenArrowUp from 'image/icon/greenArrowUp.svg';
import RedArrowDown from 'image/icon/redArrowDown.svg';
import { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import FeeCard from '../../components/FeeCard';
import Layout from '../../components/Layout';
import MerchantChart from '../../components/MerchantChart';
import OverviewCard from '../../components/OverviewCard';
import DropdownItems from '../../components/PeriodSelectDropdown/dropdownItems';
import TextFieldComponent from '../../components/Textfield';
import TransactionsTable from '../../components/TransactionsTable';
import Typography from '../../components/Typography';
import { ROUTES } from '../../constant/route';
import SearchBox from '../../components/SearchBox';
import CustomHeader from '../../components/ViewportHeader';
import Api from '../../util/api';
import moment from 'moment';

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
  width: 50%;
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

const FilterDropdown = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  max-height: 2rem;
`;

const Period = styled(Typography)`
  margin-right: 1rem;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FeeCards = styled(Cards)``;

const SecondViewport = styled(FirstViewport)``;

const TableWrapper = styled.div`
  margin-top: 1rem;
`;

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
interface Card {
  label: string,
  value: string,
  totalValue?: string,
  period?: string,
  icon: string
}

interface ChartData {
  name: string;
  items: Array<ChartItem>
}
interface ChartItem {
  _id: string,
  company: string,
  value: string
}
const Dashboard: NextPage = () => {

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

  const [overviewCards, setOverviewCards] = useState<Array<Card>>([]);
  const [topMerchants, setTopMerchants] = useState<Array<ChartData>>([]);
  const [bottomMerchants, setBottomMerchants] = useState<Array<ChartData>>([]);
  const getDashboardData = async () => {
    try {
      const merchantsTopList = await Api.getMerchantsTopList();
      const date = moment().subtract(90, 'days')
      const res = await Api.getMerchantsTransactionsStats(date.toString());
      const transactionsStats  = res.data;
      const merchantActivityStats = await Api.getAllMerchantsActivityStats();
      const merchantStats=merchantActivityStats.data;
      setOverviewCards([
        {
          label: 'Total number of transactions',
          value: transactionsStats.trCountByDate,
          totalValue: transactionsStats.trCount,
          period: 'all time',
          icon: '/image/icon/graySum.svg',
        },
        {
          label: 'Total transaction value',
          value: '£' + transactionsStats.trTotalAmountByDate,
          totalValue: '£' + transactionsStats.trTotalAmount,
          period: 'all time',
          icon: '/image/icon/greenDollar.svg',
        },
        {
          label: 'Average transaction value',
          value: '£' + transactionsStats.trAvgAmountByDate,
          totalValue: '£' + transactionsStats.trAvgAmount,
          period: 'all time',
          icon: '/image/icon/blueSum.svg',
        },
        {
          label: 'Average number of transactions',
          value: transactionsStats.trAvgCountByDate,
          totalValue: transactionsStats.trAvgCount,
          period: 'all time',
          icon: '/image/icon/blueSum.svg',
        },
        {
          label: 'Average transaction volume',
          value: '£' + transactionsStats.trAvgVolumeByDate,
          totalValue: '£' + transactionsStats.trAvgVolume,
          period: 'all time',
          icon: '/image/icon/yellowDollar.svg',
        },
        // {
        //   label: 'Fees charged by Fena',
        //   value: '£216.48',
        //   totalValue: '£1,927.20',
        //   period: 'all time',
        //   icon: '/image/icon/grayPerсent.svg',
        // },
        {
          label: 'Number of active merchants',
          value: merchantStats.activeMerchantsByDate,
          totalValue: merchantStats.activeMerchants,
          period: 'all time',
          icon: '/image/icon/greenAcception.svg',
        },
        {
          label: 'Number of inactive merchants',
          value: merchantStats.inactiveMerchantsByDate,
          totalValue: merchantStats.inactiveMerchants,
          period: 'all time',
          icon: '/image/icon/redRejection.svg',
        },
      ])

      const topByAvgTrAmount: Array<ChartItem> = merchantsTopList.data.topByAvgAmount.map((merchStat: any) => {
        return { company: merchStat.company.name, _id: merchStat.companyId, value: merchStat.result }
      });

      const topByCount: Array<ChartItem> = merchantsTopList.data.topByCount.map((merchStat: any) => {
        return { company: merchStat.company.name, _id: merchStat.companyId, value: merchStat.result }
      });

      const topByTotalAmount: Array<ChartItem> = merchantsTopList.data.topByTotalAmount.map((merchStat: any) => {
        return { company: merchStat.company.name, _id: merchStat.companyId, value: merchStat.result }
      });

      const bottomByAvgAmount: Array<ChartItem> = merchantsTopList.data.bottomByAvgAmount.map((merchStat: any) => {
        return { company: merchStat.company.name, _id: merchStat.companyId, value: merchStat.result }
      });

      const bottomByCount: Array<ChartItem> = merchantsTopList.data.bottomByCount.map((merchStat: any) => {
        return { company: merchStat.company.name, _id: merchStat.companyId, value: merchStat.result }
      });

      const bottomByTotalAmount: Array<ChartItem> = merchantsTopList.data.bottomByTotalAmount.map((merchStat: any) => {
        return { company: merchStat.company.name, _id: merchStat.companyId, value: merchStat.result }
      });

      setTopMerchants([
        {
          name: 'By average transaction value ',
          items: topByAvgTrAmount
        },
        {
          name: 'By number of transactions',
          items: topByCount
        },
        {
          name: 'By transaction volume',
          items: topByTotalAmount
        },
      ])

      setBottomMerchants([
        {
          name: 'By average transaction value ',
          items: bottomByAvgAmount
        },
        {
          name: 'By number of transactions',
          items: bottomByCount
        },
        {
          name: 'By transaction volume',
          items: bottomByTotalAmount
        },
      ])
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const onItemChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Layout
      menuItems={[
        {
          menuName: 'Dashboard',
          pathName: ROUTES.DASHBOARD,
        },
        {
          menuName: 'Transactions',
          pathName: ROUTES.TRANSACTION,
        },
        {
          menuName: 'Merchants',
          pathName: ROUTES.MERCHANTS,
        },
      ]}
    >
      <PageHeader>
        <H3 variant="h3">Dashboard</H3>
        <SearchBox onChangeHandler={() => { }} />
      </PageHeader>
      <FirstViewport>
        <CustomHeader
          title="Overview"
          description="Headline figures for all merchants. Shows selected timeframe and all
          time"
        />
        <Cards>
          {overviewCards.map((el) => {
            return (
              <OverviewCard
                key={el.label}
                props={{
                  label: el.label,
                  value: el.value,
                  totalValue: el.totalValue || "",
                  period: el.period || "",
                  icon: el.icon,
                }}
              />
            );
          })}
        </Cards>
      </FirstViewport>

      <SecondViewport>
        <CustomHeader
          title="Transactions by size"
          description=" Please filter by merchant(s) and timeframe"
        />
        <SearchBox onChangeHandler={() => { }} />
        <TableWrapper>
          <TransactionsTable />
        </TableWrapper>
      </SecondViewport>

      <ThirdViewport>
        <ViewportHeader>
          <ViewportHeaderContent>
            <TitleAndImage>
              <GreenArrowUp
                style={{
                  width: '50px',
                  height: '50px',
                }}
                alt="card icon"
              />
              <Subtitle4NoMargin variant="subtitle4">
                Top 5 merchants
              </Subtitle4NoMargin>
            </TitleAndImage>
          </ViewportHeaderContent>
          <FilterDropdown>
            <Period variant="body4">Period:</Period>
            <DropdownItems />
          </FilterDropdown>
        </ViewportHeader>

        <Chart>
          {topMerchants.map((el) => (
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
              <RedArrowDown
                style={{
                  width: '50px',
                  height: '50px',
                }}
                alt="card icon"
              />
              <Subtitle4NoMargin variant="subtitle4">
                Bottom 5 merchants
              </Subtitle4NoMargin>
            </TitleAndImage>
          </ViewportHeaderContent>
          <FilterDropdown>
            <Period variant="body4">Period:</Period>
            <DropdownItems />
          </FilterDropdown>
        </ViewportHeader>
        <Chart>
          {bottomMerchants.map((el) => (
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

      {/* <FifthViewport>
        <CustomHeader title="Fees" description="Fees charged by fena" />
        <Body1 variant="body1">
          £0.22 per transaction (average of between 1001 and 5000 transactions
          per month)
        </Body1>
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
      </FifthViewport> */}
    </Layout>
  );
};

export async function getStaticProps(context: any) {
  return {
    props: {
      protected: true,
    },
  };
}

export default Dashboard;
