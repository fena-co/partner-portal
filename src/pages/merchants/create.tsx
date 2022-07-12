import { NextPage } from 'next';
import styled from 'styled-components';
import Typography from '../../components/Typography';
import CloseIcon from 'image/icon/close.svg';
import Layout from '../../components/Layout';
import router from 'next/router';
import AddNewMerchantForm from '../../containers/AddNewMerchantLimitedCompanyForm';

const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbe3eb;
  padding: 20px 50px;
`;

const Close = styled(CloseIcon)`
  fill: #13273f;
  padding-right: 10px;
  border-right: 1px solid #b5b8ba;
  cursor: pointer;
`;

const HeaderText = styled(Typography)`
  padding-left: 10px;
`;

const CreateMerchantPage: NextPage = () => {
  return (
    <Layout>
      <Header>
        <Close onClick={() => router.back()} />
        <HeaderText>Add new merchant</HeaderText>
      </Header>
      <AddNewMerchantForm />
    </Layout>
  );
};

export default CreateMerchantPage;
