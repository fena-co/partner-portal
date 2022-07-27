import styled from 'styled-components';
import Layout from '../../../components/Layout';
import ArrowLeftIcon from 'image/icon/arrow-back.svg';
import DownloadIcon from 'image/icon/download.svg';
import Typography from '../../../components/Typography';
import router from 'next/router';
import {
  AmmountCell,
  BodyWrapper,
  ButtonCreation,
  HeaderButtons,
  HeaderLeft,
  HeaderWrapper,
  InvoiceBody,
  StatusWrapper,
  Table,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
  WrapperIcon,
} from '../../../components/StyledComponents';
import CustomHeader from '../../../components/ViewportHeader';
import OverviewCard from '../../../components/OverviewCard';
import TransactionsTable from '../../../components/TransactionsTable';
import SearchBox from '../../../components/SearchBox';
import Filter from '../../../components/Filter';
import LinkMenu from '../../../components/LinkMenu';
import { LoadingBlock } from '../../../components/LoadingBlock';
import moment from 'moment';
import ContextMenu from '../../../components/ContextMenu';
import Paginator from '../../../components/Paginator';
import SearchIcon from '../../../components/Icon/SearchIcon';
import { useEffect, useState } from 'react';
import Preview from '../../transactions/Preview';
import { TransactionStatus } from '@fena/types';
import Api from '../../../util/api'
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackIcon = styled(ArrowLeftIcon)`
  margin-right: 10px;
`;

const Download = styled(DownloadIcon)`
  margin-right: 10px;
`;

const Viewport = styled.section`
  margin-top: 50px;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const TableWrapper = styled.div`
  margin-top: 50px;
`;

const Subtitle4 = styled(Typography)``;

const menus = [
  {
    name: 'All transactions',
    value: undefined,
  },
  {
    name: 'Completed',
    value: TransactionStatus.COMPLETED,
  },
  {
    name: 'Pending',
    value: TransactionStatus.PENDING,
  },
  {
    name: 'Rejected',
    value: TransactionStatus.REJECTED,
  },
  {
    name: 'Refunds',
    value: TransactionStatus.REFUNDS,
  },
];

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
];

const Analytics: React.FunctionComponent = (companyId) => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<any>([
    { _id: '1234567', amount: '165.00', fee: '0.10', status: 'completed' },
  ]);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<
    TransactionStatus | undefined
  >(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTransactions = async () => {
    try {
      setLoading(true);
      const transactionsResult = await Api.getPaginatedTransactions(
        currentPage,
        limit,
        statusFilter
      );
      setTransactions(transactionsResult.docs);
      setTotal(transactionsResult.totalDocs);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const getAnalytics = async (companyId: string) => {
    try {
      const anal = await Api.getMerchantsTransactionsStats(companyId)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTransactions();
  }, [currentPage, statusFilter, limit, getTransactions]);

  const setFilterRule = (status: TransactionStatus | undefined) => {
    console.log(status);
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const renderEmpty = () => {
    if (!statusFilter) {
      return (
        <InvoiceBody>
          <WrapperIcon color="#DDF7F1">
            <SearchIcon lineFill="#2CD19E" />
          </WrapperIcon>
          <Typography variant="subtitle5" style={{ marginBottom: '11px' }}>
            There are no transactions here yet!
          </Typography>
          <Typography variant="body2">
            As soon as you receive your first transaction it will be shown here.
          </Typography>
        </InvoiceBody>
      );
    }

    return (
      <InvoiceBody>
        <WrapperIcon color="#DDF7F1">
          <SearchIcon lineFill="#2CD19E" />
        </WrapperIcon>
        <Typography variant="subtitle5" style={{ marginBottom: '11px' }}>
          No results found
        </Typography>
        <Typography variant="body2">
          There are no results for that query.
        </Typography>
      </InvoiceBody>
    );
  };

  return (
    <Layout menuItems={[]}>
      <PageHeader>
        <BackButton onClick={() => router.back()}>
          <BackIcon />
          <Typography variant="subtitle4">Allies Computing Ltd</Typography>
        </BackButton>
        <ButtonCreation variant="contained">
          <Download />
          Download
        </ButtonCreation>
      </PageHeader>
      <Viewport>
        <CustomHeader
          title="Overview"
          description="Headline figures for all merchants. Shows selected timeframe and all time"
        />
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
      </Viewport>
      <Viewport>
        <Subtitle4 variant="subtitle4">Transactions by size</Subtitle4>
        <TableWrapper>
          <TransactionsTable />
        </TableWrapper>
      </Viewport>
      <Viewport>
        {isOpenPreview ? (
          <Preview
            transactionId={selectedTransactionId}
            handleClose={() => {
              setIsOpenPreview(false);
              setSelectedTransactionId(undefined);
            }}
          />
        ) : (
          <>
            <HeaderWrapper>
              <HeaderLeft>
                <Typography variant="subtitle4">Transactions</Typography>
                <SearchBox />
              </HeaderLeft>
              <HeaderButtons>
                <Filter />
              </HeaderButtons>
            </HeaderWrapper>
            <LinkMenu menus={menus} clickHandler={setFilterRule} />
            <BodyWrapper>
              <LoadingBlock loading={loading}>
                {transactions?.length ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Fena ID</TableHeaderCell>
                        <TableHeaderCell>Amount</TableHeaderCell>
                        <TableHeaderCell>Fee</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Date Completed</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                      </tr>
                    </TableHeader>
                    <tbody>
                      {transactions.map((item: any) => (
                        <TableBodyRow
                          key={item._id}
                          onClick={() => {
                            setSelectedTransactionId(item._id);
                            setIsOpenPreview(true);
                          }}
                        >
                          <TableBodyCell>{item._id}</TableBodyCell>
                          <AmmountCell>£{item.amount}</AmmountCell>
                          <AmmountCell>£{item.fee}</AmmountCell>
                          <TableBodyCell>
                            <StatusWrapper status={item.status}>
                              {item.status}
                            </StatusWrapper>
                          </TableBodyCell>
                          <TableBodyCell>
                            {item.completedOn
                              ? moment(item.completedOn).format('MM/DD/YYYY')
                              : 'None'}
                          </TableBodyCell>
                          <TableBodyCell>
                            <ContextMenu
                              actions={[
                                {
                                  label: 'Details',
                                  onClick: () => {
                                    setSelectedTransactionId(item._id);
                                    setIsOpenPreview(true);
                                  },
                                },
                              ]}
                            />
                          </TableBodyCell>
                        </TableBodyRow>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  renderEmpty()
                )}
              </LoadingBlock>
            </BodyWrapper>

            {!!transactions?.length && (
              <Paginator
                total={total}
                currentPage={currentPage}
                perPage={limit}
                onPageChange={setCurrentPage}
                onPerPageChange={setLimit}
              />
            )}
          </>
        )}
      </Viewport>
    </Layout>
  );
};

export default Analytics;
