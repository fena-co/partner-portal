import { NextPage } from 'next';
import Layout from '../../components/Layout';
import { ROUTES } from '../../constant/route';

const Merchants: NextPage = () => {
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
      <div>Merchants page</div>
    </Layout>
  );
};

export default Merchants;
