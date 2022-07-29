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
import Arrow from 'image/icon/arrow-down.svg';

const StyledTableBodyCell = styled(TableBodyCell)`
  line-height: 25px;
  height: 45px;
`;

const ContactCell = styled(StyledTableBodyCell)`
  line-height: 25px;
`;

const ClickableTableHeaderCell = styled(TableHeaderCell)`
  transition: 200ms;
  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const LabelAndIcon = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowIcon = styled(Arrow)`
  margin-left: 10px;
  transform: ${(props) =>
    props[`aria-expanded`] ? `rotate(180deg)` : `rotateZ(0deg)`};
`;

const ContactItem = styled.div``;

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
    value: MerchantStatus.BANNED,
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

  const [searchConfig, setSearchConfig] = useState({ searchKeyword: '' });

  const [isSortAscending, setSortAscending] = useState(false);
  const sortDirection = isSortAscending ? 'DESC' : 'ASC';
  const [sortConfig, setSortConfig] = useState({
    sort: 'createdAt',
    sortDirection: 'DESC',
  });

  const [toggleSortArrow, setToggleSortArrow] = useState({
    contact: false,
    name: false,
    activity: false,
    id: false,
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
          sort: get(sortConfig, 'sort'),
          sortDirection: get(sortConfig, 'sortDirection'),
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

  const onNameSort = () => {
    setSortAscending(!isSortAscending);
    setSortConfig({
      sort: 'tradingName',
      sortDirection: sortDirection,
    });
    setToggleSortArrow({
      ...toggleSortArrow,
      name: !toggleSortArrow.name,
      contact: false,
      activity: false,
      id: false,
    });
  };

  const onContactSort = () => {
    setSortAscending(!isSortAscending);
    setSortConfig({
      sort: 'publicEmail',
      sortDirection: sortDirection,
    });
    setToggleSortArrow({
      ...toggleSortArrow,
      name: false,
      contact: !toggleSortArrow.contact,
      activity: false,
      id: false,
    });
  };

  const onActivitySort = () => {
    setSortAscending(!isSortAscending);
    setSortConfig({
      sort: 'last_activity',
      sortDirection: sortDirection,
    });
    setToggleSortArrow({
      ...toggleSortArrow,
      name: false,
      contact: false,
      activity: !toggleSortArrow.activity,
      id: false,
    });
  };

  const onIdSort = () => {
    setSortAscending(!isSortAscending);
    setSortConfig({
      sort: '_id',
      sortDirection: sortDirection,
    });
    setToggleSortArrow({
      ...toggleSortArrow,
      name: false,
      contact: false,
      activity: false,
      id: !toggleSortArrow.id,
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

  const getMerchantsActions = (item: any) => {
    switch (item.status) {
      case MerchantStatus.BANNED:
        return [
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
        ];
      case MerchantStatus.ACTIVE:
      case MerchantStatus.PENDING:
      case MerchantStatus.INACTIVE:
        return [
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
              const res = Api.disableMerchant(item._id);
              getMerchants();
            },
          },
        ];
      default:
        return [
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
              const res = Api.disableMerchant(item._id);
              getMerchants();
            },
          },
        ];
    }
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
                <SearchBox
                  value={searchConfig.searchKeyword}
                  onChangeHandler={handleSearchChange}
                />
              </HeaderLeft>
              <HeaderButtons>
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
                        <ClickableTableHeaderCell
                          width={150}
                          onClick={onNameSort}
                        >
                          <LabelAndIcon>
                            Merchant Name
                            <ArrowIcon aria-expanded={toggleSortArrow.name} />
                          </LabelAndIcon>
                        </ClickableTableHeaderCell>
                        <ClickableTableHeaderCell onClick={onContactSort}>
                          <LabelAndIcon>
                            Contact
                            <ArrowIcon
                              aria-expanded={toggleSortArrow.contact}
                            />
                          </LabelAndIcon>
                        </ClickableTableHeaderCell>
                        <TableHeaderCell width={150}>
                          Phone number
                        </TableHeaderCell>
                        <TableHeaderCell>Website</TableHeaderCell>
                        <TableHeaderCell>STATUS</TableHeaderCell>
                        <ClickableTableHeaderCell onClick={onActivitySort}>
                          <LabelAndIcon>
                            Last activity
                            <ArrowIcon
                              aria-expanded={toggleSortArrow.activity}
                            />
                          </LabelAndIcon>
                        </ClickableTableHeaderCell>
                        <ClickableTableHeaderCell onClick={onIdSort}>
                          <LabelAndIcon>
                            Fena ID
                            <ArrowIcon aria-expanded={toggleSortArrow.id} />
                          </LabelAndIcon>
                        </ClickableTableHeaderCell>
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
                            {item.tradingName ? item.tradingName : item.name}
                          </StyledTableBodyCell>
                          <ContactCell>
                            <ContactItem>{item.contactName}</ContactItem>
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
                              {item.status === 'pending_verification' ||
                              item.status === 'manual_review_required'
                                ? 'pending'
                                : item.status}
                            </StatusWrapper>
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {item.last_activity
                              ? moment(item.last_activity).format('DD/MM/YYYY')
                              : 'None'}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>{item._id}</StyledTableBodyCell>
                          <StyledTableBodyCell>
                            <ContextMenu actions={getMerchantsActions(item)} />
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
