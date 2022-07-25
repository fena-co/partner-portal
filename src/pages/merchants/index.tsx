import { get } from 'lodash';
import moment from 'moment';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContextMenu from '../../components/ContextMenu';
import Hypertext from '../../components/Hypertext';
import SearchIcon from '../../components/Icon/SearchIcon';
import Layout from '../../components/Layout';
import LinkMenu from '../../components/LinkMenu';
import { LoadingBlock } from '../../components/LoadingBlock';
import Paginator from '../../components/Paginator';
import SearchBox from '../../components/SearchBox';
import {
  AmmountCell,
  BodyWrapper,
  ButtonCreation,
  Container,
  HeaderButtons,
  HeaderLeft,
  HeaderWrapper,
  InvoiceBody,
  Plus,
  StatusWrapper,
  Table,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
  WrapperIcon,
} from '../../components/StyledComponents';
import Typography from '../../components/Typography';
import { ROUTES } from '../../constant/route';
import { MerchantStatus } from '../../types/api';
import Api from '../../util/api';
import Details from './details';

const StyledTableBodyCell = styled(TableBodyCell)`
  line-height: 25px;
  height: 45px;
`;

const ContactCell = styled(StyledTableBodyCell)`
  line-height: 25px;
`;

const ContactItem = styled.div``;

const Link = styled.a``;

const menus = [
  {
    name: 'Live merchants',
    value: undefined,
  },
  {
    name: 'Pending merchants',
    value: MerchantStatus.PENDING,
  },
  {
    name: 'Inactive merchants',
    value: MerchantStatus.INACTIVE,
  },
  {
    name: 'Disabled merchants',
    value: MerchantStatus.DISABLED,
  },
];

const Merchants: NextPage = () => {
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [merchants, setMerchants] = useState<any>([]);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);
  const [selectedMerchantId, setSelectedMerchantId] = useState<
    string | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<MerchantStatus | undefined>(
    undefined
  );

  const [filterConfig, setFilterConfig] = useState({});
  const [searchConfig, setSearchConfig] = useState({});

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

  const getMerchants = async () => {
    try {
      setLoading(true);
      const merchantsResult = await Api.getPaginatedMerchants(
        currentPage,
        limit,
        statusFilter,
        {
          searchKeyword: get(searchConfig, 'searchKeyword'),
          // sort: get(sortConfig, 'sort'),
          // sortDirection: get(sortConfig, 'sortDirection'),
        }
      );
      console.log(merchantsResult);
      setMerchants(merchantsResult.docs);
      setTotal(merchantsResult.totalDocs);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMerchants();
  }, [currentPage, statusFilter, limit, searchConfig, sortConfig]);

  const setFilterRule = (status: MerchantStatus | undefined) => {
    console.log(status);
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (filterValues: any) => {
    setSearchConfig(filterValues);
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
            There are no merchants here yet!
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
      {isPreviewOpen ? (
        <Details
          itemId={selectedMerchantId!}
          handleClose={() => setIsPreviewOpen(false)}
        />
      ) : (
        <>
          <Container>
            <HeaderWrapper>
              <HeaderLeft>
                <Typography variant="subtitle4">Merchants</Typography>
                <SearchBox onChangeHandler={handleSearchChange} />
              </HeaderLeft>
              <HeaderButtons>
                {/* <Filter /> */}
                <ButtonCreation
                  variant="contained"
                  onClick={() => {
                    router.push(ROUTES.MERCHANT_CREATE);
                  }}
                >
                  <Plus />
                  Add a Merchant
                </ButtonCreation>
              </HeaderButtons>
            </HeaderWrapper>
            <LinkMenu menus={menus} clickHandler={setFilterRule} />

            <BodyWrapper>
              <LoadingBlock loading={loading}>
                {merchants?.length ? (
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableHeaderCell>Merchant Name</TableHeaderCell>
                        <TableHeaderCell>Contact</TableHeaderCell>
                        <TableHeaderCell>phone number</TableHeaderCell>
                        <TableHeaderCell>Website</TableHeaderCell>
                        <TableHeaderCell>STATUS</TableHeaderCell>
                        <TableHeaderCell>Last activity</TableHeaderCell>
                        <TableHeaderCell>Fena ID</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                      </tr>
                    </TableHeader>
                    <tbody>
                      {merchants.map((item: any) => (
                        <TableBodyRow
                          key={item._id}
                          onClick={() => {
                            setSelectedMerchantId(item._id);
                            setIsPreviewOpen(true);
                          }}
                        >
                          <StyledTableBodyCell>
                            {item.tradingName}
                          </StyledTableBodyCell>
                          <ContactCell>
                            <ContactItem>{item.name}</ContactItem>
                            <ContactItem> {item.publicEmail} </ContactItem>
                          </ContactCell>
                          <StyledTableBodyCell>
                            {item.supportPhone}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Hypertext href={item.publicWebsite} target="blank">
                              {item.publicWebsite}
                            </Hypertext>
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            <StatusWrapper status={item.status}>
                              {item.status === 'pending_verification'
                                ? 'pending'
                                : item.status}
                            </StatusWrapper>
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {item.lastActivity
                              ? moment(item.lastActivity).format('MM/DD/YYYY')
                              : 'None'}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>{item._id}</StyledTableBodyCell>
                          <StyledTableBodyCell>
                            <ContextMenu
                              actions={[
                                {
                                  label: 'Details',
                                  onClick: () => {
                                    setSelectedMerchantId(item._id);
                                    setIsPreviewOpen(true);
                                  },
                                },
                                {
                                  label: 'Analytics',
                                  onClick: () => {
                                    setSelectedMerchantId(item._id);
                                    router.push('/merchants/analytics/id');
                                  },
                                },
                                {
                                  color: '#EF6355',
                                  label: 'Disable',
                                  onClick: () => {
                                    console.log('delete');
                                  },
                                },
                              ]}
                            />
                          </StyledTableBodyCell>
                        </TableBodyRow>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  renderEmpty()
                )}
              </LoadingBlock>
            </BodyWrapper>
            {!!merchants?.length && (
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

export default Merchants;
