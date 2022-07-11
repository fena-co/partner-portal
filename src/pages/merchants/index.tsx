import moment from 'moment';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ContextMenu from '../../components/ContextMenu';
import Filter from '../../components/Filter';
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
import Details from './details';

const menus = [
  {
    name: 'Live merchants',
    value: undefined,
  },
  {
    name: 'Pending merchants',
    value: MerchantStatus.ACTIVE,
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
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [merchants, setMerchants] = useState<any>([
    {
      name: 'Allies Computing Ltd',
      contact: 'Frank Gallagher',
      phoneNumber: '+44 897 66 55',
      website: 'alliescomputing.com',
      status: 'pending',
    },
  ]);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);
  const [selectedMerchantId, setSelectedMerchantId] = useState<
    string | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<MerchantStatus | undefined>(
    undefined
  );

  const setFilterRule = (status: MerchantStatus | undefined) => {
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
      {isOpenPreview ? (
        <Details handleClose={() => setIsOpenPreview(false)} />
      ) : (
        <>
          <Container>
            <HeaderWrapper>
              <HeaderLeft>
                <Typography variant="subtitle4">Merchants</Typography>
                <SearchBox />
              </HeaderLeft>
              <HeaderButtons>
                <Filter />
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
                            setIsOpenPreview(true);
                          }}
                        >
                          <TableBodyCell>{item.name}</TableBodyCell>
                          <AmmountCell>{item.contact}</AmmountCell>
                          <TableBodyCell>{item.phoneNumber}</TableBodyCell>
                          <TableBodyCell>{item.website}</TableBodyCell>
                          <TableBodyCell>
                            <StatusWrapper status={item.status}>
                              {item.status}
                            </StatusWrapper>
                          </TableBodyCell>
                          <TableBodyCell>
                            {item.lastActivity
                              ? moment(item.lastActivity).format('MM/DD/YYYY')
                              : 'None'}
                          </TableBodyCell>
                          <TableBodyCell>{item._id}</TableBodyCell>
                          <TableBodyCell>
                            <ContextMenu
                              actions={[
                                {
                                  label: 'Details',
                                  onClick: () => {
                                    setSelectedMerchantId(item._id);
                                    setIsOpenPreview(true);
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
                                  label: 'Delete',
                                  onClick: () => {
                                    console.log('delete');
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

export default Merchants;
