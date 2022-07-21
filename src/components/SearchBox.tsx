import React from 'react';
import styled from 'styled-components';
import Search from 'image/icon/search-gray.svg';

const SearchInput = styled.input`
  background: #f4f5f9;
  border: none;
  border-radius: 5px 0 0 5px;
  padding: 10px 14px;
  height: 36px;
  margin: 0;
  outline: none;
  box-sizing: border-box;
`;

const SearchButton = styled.span`
  position: absolute;
  border: none;
  background: #f4f5f9;
  border-radius: 0 5px 5px 0;
  border-left: 1px solid #dbe3eb;
  padding: 10px 14px;

  width: 45px;
  height: 36px;

  box-sizing: border-box;
`;

const Container = styled.div<{ fullWidth?: boolean }>`
  margin-left: 20px;
  width: 287px;
  @media (max-width: 900px) {
    margin: 10px 0 0 0;
  }
`;

interface SearchBoxProps {
  placeholder?: string;
  fullWidth?: boolean;
  onChangeHandler: (value: any) => void;
}
function SearchBox({ onChangeHandler, placeholder, ...rest }: SearchBoxProps) {
  return (
    <Container {...rest}>
      <SearchInput
        {...rest}
        placeholder={placeholder || 'Search'}
        onChange={(e: any) =>
          onChangeHandler({ searchKeyword: e.target.value })
        }
      />
      <SearchButton>
        <Search />
      </SearchButton>
    </Container>
  );
}

export default SearchBox;
