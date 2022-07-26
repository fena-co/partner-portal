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
import { useEffect, useState } from 'react';
import UrlWrapper from '../../../components/UrlWrapper';
import Paginator from '../../../components/Paginator';
import Hypertext from '../../../components/Hypertext';
import { Control, useForm } from 'react-hook-form';
import CreationModal from '../../../views/ApiKeyModals/creationModal';
import ViewSecretModal from '../../../views/ApiKeyModals/viewModal';
import Api from '../../../util/api';
import { get } from 'lodash';
import EditionModal from '../../../views/ApiKeyModals/editionModal';

const Key = styled(KeyIcon)`
  margin-right: 10px;
`;

const Content = styled.section``;

const StyledModalContent = styled(ModalContent)`
  top: 20%;
`;

const ApiKeysPage: NextPage = () => {
  const [apiKeyData, setApiKeyData] = useState();

  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
  });

  const { handleSubmit: handleSubmit2, control: control2 } = useForm({
    mode: 'onChange',
  });

  const [apiKeys, setApiKeys] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);

  const [isCreateApiKeyModalOpen, setIsCreateApiKeyModalOpen] = useState(false);
  const [isEditApiKeyModalOpen, setIsEditApiKeyModalOpen] = useState(false);
  const [isSecretShowModalOpen, setIsSecretShowModalOpen] = useState(false);

  const [itemSecretData, setItemSecretData] = useState('');
  const [searchConfig, setSearchConfig] = useState({});

  const [newSecretKey, setNewSecretKey] = useState('');
  const [isKeyCreated, setIsKeyCreated] = useState(false);

  const getApiKeys = async () => {
    try {
      const apiResult = await Api.getPaginatedApiKeys(currentPage, limit, {
        searchKeyword: get(searchConfig, 'searchKeyword'),
      });
      console.log(apiResult);
      setApiKeys(apiResult.docs);
      setTotal(apiResult.totalDocs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getApiKeys();
  }, [currentPage, limit, searchConfig]);

  const handleRowsPerPageChange = async (val: number) => {
    setLimit(val);
    setCurrentPage(1);
  };

  const onApiKeyCreate = async (data: any) => {
    const response = await Api.createApiKey({ name: data.apiKey });
    console.log(response);
    setNewSecretKey(response.result.secretKey);
    console.log('triggered');
    setIsKeyCreated(true);
    getApiKeys();
  };

  const onApiKeyEdit = async (data: any) => {
    console.log();
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
                    <UrlWrapper>{item._id}</UrlWrapper>
                  </TableBodyCell>
                  <TableBodyCell>
                    <Hypertext
                      onClick={() => {
                        setItemSecretData(item.secretKey);
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
                            setApiKeyData(item);
                            setIsEditApiKeyModalOpen(true);
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
          <form id="api-create" onSubmit={handleSubmit(onApiKeyCreate)}>
            <CreationModal
              toggleCreation={() => {
                setIsKeyCreated(false);
                reset({ apiKey: '' });
              }}
              handleClose={() => {
                setIsCreateApiKeyModalOpen(false);
                setIsKeyCreated(false);
                reset({ apiKey: '' });
              }}
              control={control as Control}
              secretKey={newSecretKey}
              isKeyCreated={isKeyCreated}
            />
          </form>
        </StyledModalContent>
      </Modal>
      <Modal show={isEditApiKeyModalOpen}>
        <StyledModalContent>
          <form onSubmit={handleSubmit2(onApiKeyEdit)}>
            <EditionModal
              handleClose={() => {
                setIsEditApiKeyModalOpen(false);
                reset({ apiKey: '' });
              }}
              control={control2 as Control}
              data={apiKeyData}
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
