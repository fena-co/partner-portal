import ArrowLeftIcon from 'image/icon/arrow-back.svg';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Typography from '../../components/Typography';
import api from '../../util/api';
import { TransactionApiType } from '../../types/api';

const Container = styled.div`
  margin-top: 25px;
  padding: 13px 35px;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 28px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailsWrapper = styled.div`
  border-top: 1px solid #dbe3eb;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: start;
  margin-top: 13px;
`;

const Details = styled.table`
  text-align: left;

  & > tr:nth-child(even) {
    background-color: #f4f7f9;
  }
`;

const DetailsHeader = styled.th`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 36px;
`;

const DetailsCell = styled.td`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 36px;
`;

const HeaderMenu = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const HeaderMenuItemActiveCss = css`
  border-bottom: 2px solid #2cd19e;
  color: #2cd19e;
`;

const HeaderMenuItem = styled(Typography)<{ active?: boolean }>`
  padding: 2px 0px;
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

const Preview = ({ handleClose, transactionId }: any) => {
  const [transactionData, setTransactionData] =
    useState<TransactionApiType | null>(null);
  const [activePage, setActivePage] = useState<string>('details');
  const [providerData, setProviderData] = useState<any>(null);
  console.log(providerData);

  const getTransaction = async () => {
    const result = await api.getSingleTransaction(transactionId);
    if (result.rawData) {
      const fromProvider = JSON.parse(result.rawData);
      if (fromProvider.data?.payment)
        setProviderData(fromProvider.data.payment);
    }
    setTransactionData(result);
  };

  useEffect(() => {
    getTransaction();
  }, [transactionId]);

  return (
    <>
      <Header onClick={handleClose}>
        <ArrowLeftIcon />
        <Typography style={{ paddingLeft: '5px' }} variant="body5">
          Back To transactions
        </Typography>
      </Header>
      <Container>
        <ContentHeader>
          <HeaderMenu>
            <HeaderMenuItem
              onClick={() => setActivePage('details')}
              active={activePage === 'details'}
            >
              Transaction Details
            </HeaderMenuItem>
            {/*<HeaderMenuItem
              onClick={() => setActivePage('remitter')}
              active={activePage === 'remitter'}
            >
              Remitter Details
            </HeaderMenuItem>
            <HeaderMenuItem
              onClick={() => setActivePage('delivery')}
              active={activePage === 'delivery'}
            >
              Delivery Address
            </HeaderMenuItem>*/}
          </HeaderMenu>
          {/* Hiding the button for now */}
          {/* <ButtonCreation variant="contained">Download Receipt</ButtonCreation> */}
        </ContentHeader>
        {activePage === 'details' && (
          <DetailsWrapper>
            <Details>
              <tr>
                <DetailsHeader>Fena ID: </DetailsHeader>
                <DetailsCell>{transactionData?._id}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Reference: </DetailsHeader>
                <DetailsCell>{transactionData?.reference}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Amount: </DetailsHeader>
                <DetailsCell>{transactionData?.amount}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Status: </DetailsHeader>
                <DetailsCell>
                  {transactionData?.status.toUpperCase()}
                </DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Merchant Payment ID: </DetailsHeader>
                <DetailsCell>
                  {providerData?.customerPaymentId || 'None'}
                </DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>FPS Reference: </DetailsHeader>
                <DetailsCell>
                  {providerData?.id
                    ? providerData.id.replaceAll('-', '').substring(0, 18)
                    : 'None'}
                </DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>FPPS Reference:: </DetailsHeader>
                <DetailsCell>{providerData?.id || 'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Created At: </DetailsHeader>
                <DetailsCell>
                  {moment(transactionData?.createdAt).format(
                    'DD/MM/YYYY hh:mm:ss'
                  )}
                </DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Payment Completed At: </DetailsHeader>
                <DetailsCell>
                  {' '}
                  {transactionData?.completedAt
                    ? moment(transactionData?.completedAt).format(
                        'DD/MM/YYYY hh:mm:ss'
                      )
                    : 'None'}
                </DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Beneficiary Name: </DetailsHeader>
                <DetailsCell>
                  {providerData?.beneficiaryName || 'None'}
                </DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Beneficiary Bank Account: </DetailsHeader>
                <DetailsCell>
                  {providerData?.beneficiaryAccountNumber || 'None'}
                </DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Beneficiary Bank Sort Code: </DetailsHeader>
                <DetailsCell>
                  {providerData?.beneficiarySortCode || 'None'}
                </DetailsCell>
              </tr>
            </Details>
          </DetailsWrapper>
        )}

        {activePage === 'remitter' && (
          <DetailsWrapper>
            <Details>
              <tr>
                <DetailsHeader>First Name: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Last Name: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Email: </DetailsHeader>
                <DetailsCell>{'-'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Contact: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
            </Details>
          </DetailsWrapper>
        )}

        {activePage === 'delivery' && (
          <DetailsWrapper>
            <Details>
              <tr>
                <DetailsHeader>Address Line 1: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Address Line 2: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>City: </DetailsHeader>
                <DetailsCell>{'-'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Post Code: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
              <tr>
                <DetailsHeader>Country: </DetailsHeader>
                <DetailsCell>{'None'}</DetailsCell>
              </tr>
            </Details>
          </DetailsWrapper>
        )}
      </Container>
    </>
  );
};

export default Preview;
