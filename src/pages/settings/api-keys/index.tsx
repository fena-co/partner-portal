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

const ApiKeyStatus = styled.div<{ status: boolean }>`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  padding: 9px 18px;
  border-radius: 5px;
  width: 100px;
  box-sizing: border-box;
  color: ${({ status }) => (status ? '#2CD19E' : '#6C6C8A')};
  background-color: ${({ status }) => (status ? '#E8F5E9' : '#E6E9ED')};
`;

const ApiKeysPage: NextPage = () => {
  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
  });

  const {
    handleSubmit: editHandleSubmit,
    control: editControl,
    reset: editReset,
  } = useForm({
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

  const [apiKeyId, setApiKeyId] = useState('');

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

  const handleSearchChange = (filterValues: any) => {
    setSearchConfig(filterValues);
    setCurrentPage(1);
  };

  const onApiKeyCreate = async (data: any) => {
    const response = await Api.createApiKey({ name: data.keyName });
    console.log(response);
    setNewSecretKey(response.result.secretKey);
    console.log('triggered');
    setIsKeyCreated(true);
    getApiKeys();
  };

  const onApiKeyEdit = async (data: any) => {
    const updateResponse = await Api.updateApiKey(
      { name: data.newKeyName },
      apiKeyId
    );
    console.log('update', updateResponse);
    setIsEditApiKeyModalOpen(false);
    getApiKeys();
  };

  const handlerDisable = async (id: string) => {
    const disableRes = await Api.disableApiKey(id);
    getApiKeys();
    console.log('disableKey', disableRes);
  };

  return (
    <Layout menuItems={[]}>
      <HeaderWrapper>
        <HeaderLeft>
          <Typography variant="subtitle4">API keys</Typography>
          <SearchBox onChangeHandler={handleSearchChange} />
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
              <TableHeaderCell>Status</TableHeaderCell>
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
                    <ApiKeyStatus status={item.isActive}>
                      {item.isActive ? 'Enabled' : 'Disabled'}
                    </ApiKeyStatus>
                  </TableBodyCell>
                  <TableBodyCell>
                    <ContextMenu
                      actions={[
                        {
                          label: 'Edit',
                          onClick: () => {
                            setApiKeyId(item._id);
                            editReset({ newKeyName: item.name });
                            setIsEditApiKeyModalOpen(true);
                          },
                        },
                        {
                          label: 'Disable',
                          onClick: () => {
                            handlerDisable(item._id);
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
                reset({ keyName: '' });
              }}
              handleClose={() => {
                setIsCreateApiKeyModalOpen(false);
                setIsKeyCreated(false);
                reset({ keyName: '' });
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
          <form id="api-edit" onSubmit={editHandleSubmit(onApiKeyEdit)}>
            <EditionModal
              handleClose={() => {
                setIsEditApiKeyModalOpen(false);
                reset({ newKeyName: '' });
              }}
              control={editControl as Control}
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
