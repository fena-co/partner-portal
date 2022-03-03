import React, { FC } from 'react';
import styled from 'styled-components';
import ArrowRight from 'image/icon/arrow-right-outline.svg';
import MenuItem from './MenuItem';
import SelectDropDown from './PeriodSelectDropdown';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #6c6c8a;

  margin-top: 25px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
`;

const MetaText = styled.div`
  margin-right: 10px;
  padding-top: 20px;
`;

const Pages = styled.div`
  margin: 20px 20px 0;
`;

const PageButton = styled.button<{ active?: boolean }>`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  border: none;
  cursor: pointer;
  width: 23px;
  height: 23px;
  background: ${({ active }) => (active ? '#DBE3EB' : 'none')};
  border-radius: 3px;

  :hover {
    background-color: #dbe3eb;
  }
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  background: #ffffff;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 13px;
  line-height: 26px;
  color: #9898ad;
  padding: 4px 17px;
  margin: 0 4px;
  margin-top: 20px;
  cursor: pointer;

  :hover {
    ${({ disabled }) => (!disabled ? 'background-color: #f4f7f9;' : '')}
  }

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
  `}
`;

const PageSelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const Paginator: FC<Props> = ({
  total = 20,
  currentPage = 1,
  perPage = 25,
  onPageChange = () => {},
  onPerPageChange = () => {},
}) => {
  const handlePerPageChange = (num: number) => () => {
    onPerPageChange?.(num);
  };

  return (
    <Container>
      <Meta>
        <MetaText>Rows per page:</MetaText>
        <SelectDropDown
          value={perPage}
          style={{
            fontSize: '13px',
            lineHeight: '10px',
          }}
        >
          <MenuItem onClick={handlePerPageChange(25)}>25</MenuItem>
          <MenuItem onClick={handlePerPageChange(50)}>50</MenuItem>
          <MenuItem onClick={handlePerPageChange(100)}>100</MenuItem>
        </SelectDropDown>
      </Meta>
      <PageSelectionWrapper>
        <MetaText>
          Results: {currentPage * perPage - perPage + 1} -{' '}
          {currentPage * perPage > total ? total : currentPage * perPage} of{' '}
          {total}
        </MetaText>
        <PaginationButton
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowRight style={{ transform: 'rotate(180deg)' }} /> Prev
        </PaginationButton>
        <Pages>
          {Array.from(Array(Math.ceil(total / perPage)), (_, i) => (
            <PageButton
              key={i}
              active={i + 1 === currentPage}
              onClick={() => onPageChange?.(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pages>
        <PaginationButton
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === Math.ceil(total / perPage)}
        >
          Next <ArrowRight />
        </PaginationButton>
      </PageSelectionWrapper>
    </Container>
  );
};

export default Paginator;
