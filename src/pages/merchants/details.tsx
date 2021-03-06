import styled, { css } from 'styled-components';
import ArrowLeftIcon from 'image/icon/arrow-back.svg';
import Typography from '../../components/Typography';
import { useEffect, useState } from 'react';
import BankAccountCard from '../../components/BankAccountCard';
import ShareVerificationLink from '../../components/ShareVerificationLink';
import Api from '../../util/api';
import { CompanyTypes } from '@fena/types';
import {
  ButtonCreation,
  Modal,
  ModalContent,
} from '../../components/StyledComponents';
import AddBankAccountModal from './AddBankAccount';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const addBaSchema = yup.object({
  provider: yup.object({
    label: yup.string().required('This field is required'),
    value: yup.string().required(),
  }),
  name: yup.string().required('This field is required'),
  identification: yup
    .string()
    .required('This field is required')
    .matches(/\d{2}-\d{2}-\d{2}/, 'Sort code is invalid'),
  externalAccountId: yup
    .string()
    .required('This field is required')
    .min(8, 'Account number must be 8 digits')
    .max(8, 'Account number must be 8 digits'),
});

const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackIcon = styled(ArrowLeftIcon)`
  margin-right: 10px;
`;

const Container = styled.div`
  margin-top: 25px;
  padding: 0 35px;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 10px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailsWrapper = styled.div`
  border-top: 1px solid #dbe3eb;
  display: flex;
  padding-top: 50px;
  padding-bottom: 150px;
`;

const HeaderMenu = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const HeaderMenuItemActiveCss = css`
  border-bottom: 2px solid #2cd19e;
`;

const HeaderMenuItem = styled(Typography)<{ active?: boolean }>`
  padding: 25px 0px;
  margin: 0px 25px;
  cursor: pointer;
  ${({ active }) => active && HeaderMenuItemActiveCss};
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

const DetailsContainer = styled.div`
  margin-right: 80px;
`;

const Title = styled(Typography)`
  margin-bottom: 10px;
`;

const BankAccounts = styled.div`
  border-top: 1px solid #dbe3eb;
`;

const BankAccountCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  padding: 10px 0 20px 0;
`;

const StyledButtonCreation = styled(ButtonCreation)`
  margin-top: 20px;
`;

const VerificationContainer = styled.div`
  display: flex;
  flex-basis: 100%;
`;

const StatusWrapper = styled.div`
  display: flex;
`;

const Status = styled.div<{ status: string }>`
  border-radius: 5px;
  padding: 5px 15px;
  background-color: ${(props) =>
    props.status === 'active' ? '#E4F9F2' : '#fce4e2'};
  color: ${(props) => (props.status === 'active' ? '#2CD19E' : '#EF6355')};
`;

const TableWrapper = styled.div``;

const Table = styled.table`
  margin-right: 50px;
`;

const ChecksCell = styled.td`
  padding-right: 50px;
  padding-top: 10px;
`;

const Checks = styled(Typography)``;

const StatusCell = styled.td`
  padding-top: 10px;
`;

const Th = styled.th`
  text-align: start;
`;

const Tbody = styled.tbody``;

interface DetailsProps {
  itemId: string;
  handleClose: () => void;
}

const Details: React.FunctionComponent<DetailsProps> = ({
  handleClose,
  itemId,
}) => {
  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(addBaSchema),
  });

  const [activePage, setActivePage] = useState<string>('company');
  const [data, setData] = useState<any>(null);
  const [verificationData, setVerificationData] = useState([]);
  const [isAddBankAccountModalOpen, setAddBankAccountModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  console.log('details', data);

  const getData = async () => {
    // setLoading(true);
    const result = await Api.getMerchant(itemId);
    setData(result);
    const linksRes = await Api.getVerificationLinks(itemId);
    setVerificationData(linksRes.data);
    console.log(linksRes.data);
    // setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onBankCreate = async (data: any) => {
    setLoading(true);
    const response = await Api.createAccount(
      {
        name: data.name,
        provider: data.provider.value,
        identification: data.identification?.replace(/-/g, ''),
        externalAccountId: data.externalAccountId,
      },
      itemId
    );
    console.log(response);
    getData();
    setAddBankAccountModalOpen(false);
    setLoading(false);
    reset({
      name: '',
      provider: { label: '', value: '' },
      identification: '',
      externalAccountId: '',
    });
  };
  return (
    <>
      <BackButton onClick={() => handleClose()}>
        <BackIcon />
        <Typography variant="body5">Back to merchants</Typography>
      </BackButton>
      <Container>
        <ContentHeader>
          <HeaderMenu>
            <HeaderMenuItem
              onClick={() => setActivePage('company')}
              active={activePage === 'company'}
            >
              Company Details
            </HeaderMenuItem>
            <HeaderMenuItem
              onClick={() => setActivePage('personal')}
              active={activePage === 'personal'}
            >
              Personal Details
            </HeaderMenuItem>
            <HeaderMenuItem
              onClick={() => setActivePage('bankAccounts')}
              active={activePage === 'bankAccounts'}
            >
              Bank Accounts
            </HeaderMenuItem>
            <HeaderMenuItem
              onClick={() => setActivePage('verification')}
              active={activePage === 'verification'}
            >
              Verification
            </HeaderMenuItem>
          </HeaderMenu>
        </ContentHeader>
        {activePage === 'company' && (
          <DetailsWrapper>
            {data?.type === CompanyTypes.COMPANY && (
              <>
                <DetailsContainer>
                  <Title variant="body5">Company number</Title>
                  <Typography variant="lightBody">
                    {data?.identifier}
                  </Typography>
                  <Typography variant="lightBody">company</Typography>
                </DetailsContainer>
                <DetailsContainer>
                  <Title variant="body5">Registered name</Title>
                  <Typography variant="lightBody">{data?.name}</Typography>
                </DetailsContainer>
                <DetailsContainer>
                  <Title variant="body5">Registered address</Title>
                  <Typography variant="lightBody">
                    {data?.address?.addressLine1}
                  </Typography>
                  <Typography variant="lightBody">
                    {data?.address?.addressLine2}
                  </Typography>
                  <Typography variant="lightBody">
                    {data?.address?.city}
                  </Typography>
                  <Typography variant="lightBody">
                    {data?.address?.zipCode}
                  </Typography>
                </DetailsContainer>
              </>
            )}

            {data?.tradingName && (
              <DetailsContainer>
                <Title variant="body5">Trading name</Title>
                <Typography variant="lightBody">{data?.tradingName}</Typography>
              </DetailsContainer>
            )}

            <DetailsContainer>
              <Title variant="body5">Trading address</Title>
              <Typography variant="lightBody">
                <Typography variant="lightBody">
                  {data?.type === CompanyTypes.SOLE_TRADER
                    ? data?.address?.addressLine1
                    : data?.tradingAddress?.addressLine1}
                </Typography>
                <Typography variant="lightBody">
                  {data?.type === CompanyTypes.SOLE_TRADER
                    ? data?.address?.addressLine2
                    : data?.tradingAddress?.addressLine2}
                </Typography>
                <Typography variant="lightBody">
                  {data?.type === CompanyTypes.SOLE_TRADER
                    ? data?.address?.city
                    : data?.tradingAddress?.city}
                </Typography>
                <Typography variant="lightBody">
                  {data?.type === CompanyTypes.SOLE_TRADER
                    ? data?.address?.zipCode
                    : data?.tradingAddress?.zipCode}
                </Typography>
              </Typography>
            </DetailsContainer>
            {data?.type === CompanyTypes.SOLE_TRADER && (
              <DetailsContainer>
                <Title variant="body5">
                  {data?.countryCode === 'GB' ? 'UTR' : 'TIN'}
                </Title>
                <Typography variant="lightBody">{data.identifier}</Typography>
              </DetailsContainer>
            )}
          </DetailsWrapper>
        )}

        {activePage === 'personal' && (
          <DetailsWrapper>
            <DetailsContainer>
              <Title variant="body5">Primary contact details</Title>
              <Typography variant="lightBody">{data.contactName}</Typography>
              <Typography variant="lightBody">{data.publicEmail}</Typography>
              <Typography variant="lightBody">{data.supportPhone}</Typography>
            </DetailsContainer>
            {/* {data?.type === CompanyTypes.COMPANY && (
              <DetailsContainer>
                <Title variant="body5">Director details</Title>
                <Typography variant="lightBody">
                  {user.firstName}
                  {` `}
                  {user.lastName}
                </Typography>
                <Typography variant="lightBody">{user.supportEmail}</Typography>
                <Typography variant="lightBody">{user.supportPhone}</Typography>
              </DetailsContainer>
            )} */}
          </DetailsWrapper>
        )}

        {activePage === 'bankAccounts' && (
          <BankAccounts>
            <StyledButtonCreation
              variant="contained"
              onClick={() => setAddBankAccountModalOpen(true)}
            >
              {!data.bankAccounts.length
                ? 'Add bank account'
                : 'Update bank account'}
            </StyledButtonCreation>
            <BankAccountCardWrapper>
              {data.bankAccounts.map((acc: any) => {
                return (
                  <BankAccountCard
                    key={acc._id}
                    account={{
                      accountName: acc.name,
                      accountNumber: acc.externalAccountId,
                      bankImg: acc.provider.logo,
                      sortCode: acc.identification,
                      title: acc.provider.name,
                      status: acc.status,
                      accId: acc._id,
                      companyId: data._id,
                    }}
                    getBankAccounts={() => {
                      getData();
                    }}
                  />
                );
              })}
            </BankAccountCardWrapper>
          </BankAccounts>
        )}

        {activePage === 'verification' && (
          <DetailsWrapper>
            <VerificationContainer>
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th></Th>
                      <Th>
                        <Typography variant="body5">STATUS</Typography>
                      </Th>
                    </tr>
                  </thead>

                  <Tbody>
                    <tr>
                      <ChecksCell>
                        <Checks variant="body5">ID and AML checks</Checks>
                      </ChecksCell>
                      <StatusCell>
                        <StatusWrapper>
                          <Status status={data.status}>
                            {data.status === 'active'
                              ? 'Verified'
                              : 'Unverified'}
                          </Status>
                        </StatusWrapper>
                      </StatusCell>
                    </tr>
                  </Tbody>
                </Table>
              </TableWrapper>
              <ShareVerificationLink verificationData={verificationData} />
            </VerificationContainer>
          </DetailsWrapper>
        )}
        <Modal show={isAddBankAccountModalOpen}>
          <ModalContent>
            <form onSubmit={handleSubmit(onBankCreate)}>
              <AddBankAccountModal
                loading={loading}
                control={control}
                handleClose={() => setAddBankAccountModalOpen(false)}
              />
            </form>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};

export default Details;
