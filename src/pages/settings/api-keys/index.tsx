import { NextPage } from 'next';
import router from 'next/router';
import Layout from '../../../components/Layout';
import SearchBox from '../../../components/SearchBox';
import {
  ButtonCreation,
  HeaderButtons,
  HeaderLeft,
  HeaderWrapper,
  Table,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
} from '../../../components/StyledComponents';
import KeyIcon from 'image/icon/key.svg';
import Typography from '../../../components/Typography';
import { ROUTES } from '../../../constant/route';
import styled from 'styled-components';
import ContextMenu from '../../../components/ContextMenu';
import { useState } from 'react';
import UrlWrapper from '../../../components/UrlWrapper';

const Key = styled(KeyIcon)`
  margin-right: 10px;
`;

const Content = styled.section``;

const ApiKeysPage: NextPage = () => {
  const [apiKeys, setApiKeys] = useState([
    {
      name: 'data-application-fena',
      key: '2ff114b3925b595879v83de9dc15d40a',
      createdOn: 'a few seconds ago',
    },
  ]);

  return (
    <Layout menuItems={[]}>
      <HeaderWrapper>
        <HeaderLeft>
          <Typography variant="subtitle4">API keys</Typography>
          <SearchBox />
        </HeaderLeft>
        <HeaderButtons>
          <ButtonCreation
            variant="contained"
            onClick={() => {
              router.push(ROUTES.MERCHANT_CREATE);
            }}
          >
            <Key />
            Generate API keys
          </ButtonCreation>
        </HeaderButtons>
      </HeaderWrapper>
      <Content>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Key</TableHeaderCell>
              <TableHeaderCell>Created</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {apiKeys.map((item: any) => (
              <>
                <TableBodyRow
                  key={item.key}
                  onClick={() => {
                    // setCurrentTerminalData(item);
                    // setEditOpen(true);
                  }}
                >
                  <TableBodyCell>{item.name}</TableBodyCell>
                  <TableBodyCell>
                    <UrlWrapper>{item.key}</UrlWrapper>
                  </TableBodyCell>
                  <TableBodyCell>{item.createdOn}</TableBodyCell>

                  <TableBodyCell>
                    <ContextMenu
                      actions={[
                        {
                          label: 'Edit',
                          onClick: () => {
                            // setCurrentTerminalData(item);
                            // setEditOpen(true);
                          },
                        },
                        {
                          label: 'Delete',
                          onClick: () => {
                            // setIsDeleteOpen(true);
                            // setTerminalIdForDeletion(item._id);
                            // setTerminalName(item.name);
                          },
                          color: '#EF6355',
                        },
                      ]}
                    />
                  </TableBodyCell>
                </TableBodyRow>
              </>
            ))}
          </tbody>
        </Table>
      </Content>
    </Layout>
  );
};

export default ApiKeysPage;
