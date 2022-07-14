import { NextPage } from 'next';
import router from 'next/router';
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
import Close from 'image/icon/close.svg';
import Typography from '../../../components/Typography';
import { ROUTES } from '../../../constant/route';
import styled from 'styled-components';
import ContextMenu from '../../../components/ContextMenu';
import { useState } from 'react';
import UrlWrapper from '../../../components/UrlWrapper';
import Paginator from '../../../components/Paginator';
import TextFieldComponent from '../../../components/Textfield';
import ButtonWithChildren from '../../../components/Button';

const Key = styled(KeyIcon)`
  margin-right: 10px;
`;

const Content = styled.section``;

const StyledModalContent = styled(ModalContent)`
  top: 20%;
`;

const ModalHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #dbe3eb;
`;

const ModalWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 400px;
`;

const CloseCircledButton = styled.div``;

const CloseIcon = styled(Close)`
  fill: #495b6c;
`;

const ApiKeysPage: NextPage = () => {
  const [apiKeys, setApiKeys] = useState([
    {
      name: 'data-application-fena',
      key: '2ff114b3925b595879v83de9dc15d40a',
      createdOn: 'a few seconds ago',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowsPerPageChange = async (val: number) => {
    setLimit(val);
    setCurrentPage(1);
  };

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
              setIsModalOpen(true);
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
        <Paginator
          total={total}
          currentPage={currentPage}
          perPage={limit}
          onPageChange={setCurrentPage}
          onPerPageChange={handleRowsPerPageChange}
        />
      </Content>
      <Modal show={isModalOpen}>
        <StyledModalContent>
          <ModalWrapperContent>
            <ModalHeader>
              <Typography variant="body1">New API Key</Typography>
              <CloseCircledButton>
                <CloseIcon />
              </CloseCircledButton>
            </ModalHeader>
            <Typography>Name</Typography>
            <TextFieldComponent />
            <ButtonWithChildren variant="contained">
              Create key
            </ButtonWithChildren>
          </ModalWrapperContent>
        </StyledModalContent>
      </Modal>
    </Layout>
  );
};

export default ApiKeysPage;
