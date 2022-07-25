import { NextPage } from 'next';
import Layout from '../../../components/Layout';
import SearchBox from '../../../components/SearchBox';
import {
  ButtonCreation,
  HeaderButtons,
  HeaderLeft,
  HeaderWrapper,
  Modal,
  ModalContent,
  Table,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
  TableHeaderCell,
} from '../../../components/StyledComponents';
import KeyIcon from 'image/icon/key.svg';
import Typography from '../../../components/Typography';
import styled from 'styled-components';
import ContextMenu from '../../../components/ContextMenu';
import { useState } from 'react';
import UrlWrapper from '../../../components/UrlWrapper';
import Paginator from '../../../components/Paginator';
import Hypertext from '../../../components/Hypertext';
import { Control, useForm } from 'react-hook-form';
import CreationModal from '../../../views/ApiKeyModals/creationModal';
import ViewSecretModal from '../../../views/ApiKeyModals/viewModal';
import Api from '../../../util/api';

const Key = styled(KeyIcon)`
  margin-right: 10px;
`;

const Content = styled.section``;

const StyledModalContent = styled(ModalContent)`
  top: 20%;
`;

const ApiKeysPage: NextPage = () => {
  const { handleSubmit, control } = useForm({
    mode: 'onChange',
  });

  const [apiKeys, setApiKeys] = useState([
    {
      name: 'Data-application-fena',
      key: '2ff114b3925b595879v83de9dc15d40a',
      terminalSecret: '342ffll34234mmj3l3n33995',
    },
    {
      name: 'API Key created by john on 2022-07-01',
      key: '62b488ae6ba2cb6a040b1e46',
      terminalSecret: '342ffll34234mmj3l3n33990',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);

  const [isCreateApiKeyModalOpen, setIsCreateApiKeyModalOpen] = useState(false);

  const [isSecretShowModalOpen, setIsSecretShowModalOpen] = useState(false);

  const [itemSecretData, setItemSecretData] = useState('');

  const handleRowsPerPageChange = async (val: number) => {
    setLimit(val);
    setCurrentPage(1);
  };

  const onApiCreate = async (data: any) => {
    const response = await Api.createApiKey({ name: data.apiKey });
    console.log(response);
  };

  return (
    <Layout menuItems={[]}>
      <HeaderWrapper>
        <HeaderLeft>
          <Typography variant="subtitle4">API keys</Typography>
          <SearchBox onChangeHandler={() => {}} />
        </HeaderLeft>
        <HeaderButtons>
          <ButtonCreation
            variant="contained"
            onClick={() => {
              setIsCreateApiKeyModalOpen(true);
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
              <TableHeaderCell>Terminal secret</TableHeaderCell>
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
                  <TableBodyCell>
                    <Hypertext
                      onClick={() => {
                        setItemSecretData(item.terminalSecret);
                        setIsSecretShowModalOpen(true);
                      }}
                    >
                      Show
                    </Hypertext>
                  </TableBodyCell>

                  <TableBodyCell>
                    <ContextMenu
                      actions={[
                        {
                          label: 'Edit',
                          onClick: () => {
                            // setCurrentTerminalData(item);
                            setIsCreateApiKeyModalOpen(true);
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
        <Paginator
          total={total}
          currentPage={currentPage}
          perPage={limit}
          onPageChange={setCurrentPage}
          onPerPageChange={handleRowsPerPageChange}
        />
      </Content>
      <Modal show={isCreateApiKeyModalOpen}>
        <StyledModalContent>
          <form onSubmit={handleSubmit(onApiCreate)}>
            <CreationModal
              handleClose={() => setIsCreateApiKeyModalOpen(false)}
              control={control as Control}
            />
          </form>
        </StyledModalContent>
      </Modal>
      <Modal show={isSecretShowModalOpen}>
        <StyledModalContent>
          <ViewSecretModal
            handleClose={() => setIsSecretShowModalOpen(false)}
            itemSecretData={itemSecretData}
          />
        </StyledModalContent>
      </Modal>
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

export default ApiKeysPage;
