import { TransactionStatus } from '@fena/types';
import { get } from 'lodash';
import moment from 'moment';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import ContextMenu from '../../components/ContextMenu';
import Filter from '../../components/Filter';
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
import Api from '../../util/api';
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
  const [filterConfig, setFilterConfig] = useState({});
  const [searchConfig, setSearchConfig] = useState({ searchKeyword: '' });

  const [isSortAscending, setSortAscending] = useState(false);
  const sortDirection = isSortAscending ? 'DESC' : 'ASC';
  const [sortConfig, setSortConfig] = useState({
    sort: 'completedAt',
    sortDirection: 'DESC',
  });

  const [toggleSortArrow, setToggleSortArrow] = useState({
    completed: false,
    amount: false,
    created: false,
  });

  const getTransactions = async () => {
    try {
      setLoading(true);
      const transactionsResult = await Api.getPaginatedTransactions(
        currentPage,
        limit,
        statusFilter,
        {
          from: get(filterConfig, 'created.from'),
          to: get(filterConfig, 'created.to'),
          completedFrom: get(filterConfig, 'dueDate.from'),
          completedTo: get(filterConfig, 'dueDate.to'),
          amountFrom: get(filterConfig, 'amount.from'),
          amountTo: get(filterConfig, 'amount.to'),
          searchKeyword: get(searchConfig, 'searchKeyword'),
          sort: get(sortConfig, 'sort'),
          sortDirection: get(sortConfig, 'sortDirection'),
        }
      );
      console.log(transactionsResult);
      setTransactions(transactionsResult.docs);
      setTotal(transactionsResult.totalDocs);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [
    currentPage,
    statusFilter,
    limit,
    filterConfig,
    searchConfig,
    sortConfig,
  ]);

  const setFilterRule = (status: TransactionStatus | undefined) => {
    console.log(status);
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterValues: any) => {
    setFilterConfig(filterValues);
  };

  const handleSearchChange = (filterValues: any) => {
    setSearchConfig(filterValues);
    setCurrentPage(1);
  };

  const onCompletedSort = () => {
    setSortAscending(!isSortAscending);
    setSortConfig({
      sort: 'completedAt',
      sortDirection: sortDirection,
    });
    setToggleSortArrow({
      ...toggleSortArrow,
      completed: !toggleSortArrow.completed,
      amount: false,
    });
  };

  const onAmountSort = () => {
    setSortAscending(!isSortAscending);
    setSortConfig({
      sort: 'amount',
      sortDirection: sortDirection,
    });
    setToggleSortArrow({
      ...toggleSortArrow,
      amount: !toggleSortArrow.amount,
      completed: false,
    });
  };

  const onCreatedSort = () => {
    setSortAscending(!isSortAscending);
    setSortConfig({
      sort: 'createdAt',
      sortDirection: sortDirection,
    });
    setToggleSortArrow({
      ...toggleSortArrow,
      created: !toggleSortArrow.created,
      completed: false,
      amount: false,
    });
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
                <SearchBox
                  value={searchConfig.searchKeyword}
                  onChangeHandler={handleSearchChange}
                />
              </HeaderLeft>
              <HeaderButtons>
                <Filter transactions onChange={handleFilterChange} />
              </HeaderButtons>
            </HeaderWrapper>
            <LinkMenu menus={menus} clickHandler={setFilterRule} />
            <BodyWrapper>
              <LoadingBlock loading={loading}>
                {transactions?.length ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Reference number</TableHeaderCell>
                        <TableHeaderCell>Amount</TableHeaderCell>
                        {/* <TableHeaderCell>Fee</TableHeaderCell> */}
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
                          <TableBodyCell>{item.reference}</TableBodyCell>
                          <AmmountCell>£{item.amount}</AmmountCell>
                          {/* <AmmountCell>£{item.fee}</AmmountCell> */}
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

export async function getStaticProps(context: any) {
  return {
    props: {
      protected: true,
    },
  };
}

export default Transactions;
