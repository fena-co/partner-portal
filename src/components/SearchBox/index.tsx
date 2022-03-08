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

const Container = styled.div`
  width: 287px;
`;

function SearchBox() {
  return (
    <Container>
      <SearchInput placeholder="Search" />
      <SearchButton>
        <Search />
      </SearchButton>
    </Container>
  );
}

export default SearchBox;
