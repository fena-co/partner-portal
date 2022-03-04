import moment from 'moment';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import ContextMenu from '../../components/ContextMenu';
import Filter from '../../components/Filter';
import Hypertext from '../../components/Hypertext';
import SearchIcon from '../../components/Icon/SearchIcon';
import Layout from '../../components/Layout';
import LinkMenu from '../../components/LinkMenu';
import { LoadingBlock } from '../../components/LoadingBlock';
import Paginator from '../../components/Paginator';
import SearchBox from '../../components/SearchBox';
import {
  InvoiceBody,
  WrapperIcon,
  Container,
  HeaderWrapper,
  HeaderLeft,
  HeaderButtons,
  BodyWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBodyRow,
  TableBodyCell,
  AmmountCell,
  StatusWrapper,
} from '../../components/StyledComponents';
import Typography from '../../components/Typography';
import { ROUTES } from '../../constant/route';
import { TransactionStatus } from '../../types/api';
import Preview from './Preview';

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

const Transactions: NextPage = () => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<any>([]);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<
    TransactionStatus | undefined
  >(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const getTransactions = async () => {
  //   try {
  //     setLoading(true);
  //     const transactionsResult = await Api.getPaginatedTransactions(
  //       currentPage,
  //       limit,
  //       statusFilter
  //     );
  //     setTransactions(transactionsResult.docs);
  //     setTotal(transactionsResult.totalDocs);
  //     setLoading(false);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   getTransactions();
  // }, [currentPage, statusFilter, limit, getTransactions]);

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
          <Container>
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
                        <TableHeaderCell>Merchant</TableHeaderCell>
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
                          <AmmountCell>{item.fee}</AmmountCell>
                          <TableBodyCell>
                            <StatusWrapper status={item.status}>
                              {item.status}
                            </StatusWrapper>
                          </TableBodyCell>
                          <TableBodyCell>{item.merchantName}</TableBodyCell>
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
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Transactions;
