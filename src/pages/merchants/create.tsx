import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import CountrySelectionDropdown from '../../components/CountrySelectionDropdown';
import SelectDropDown from '../../components/SelectDropDown';
import Typography from '../../components/Typography';
import { COUNTRY_CODES } from '../../constant/countries';
import { CompanyTypes } from '../../types/api';

const businessTypes = {
  individual: 'Sole Trader / Individual',
  limited: 'Limited Company',
};

const company: any = {
  countryName: 'United Kingdom',
  code: '+44',
  country: 'GB',
};

const Wrapper = styled.section``;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #dbe3eb;
  padding: 20px;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  padding: 30px calc((100vw - 380px) / 2);
`;

const Title = styled(Typography)`
  text-align: center;
`;

const WrapperTextField = styled.div`
  margin-top: 10px;
  &:first-child {
    margin-top: 0px;
  }
`;

const MenuItem = styled.li`
  list-style: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  /* font-size: 14px; */
  line-height: 24px;
  text-transform: capitalize;
  color: #13273f;
  padding: 12px 23px;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    background: #f4f7f9;
  }
`;

const Create: NextPage = () => {
  const [country, setCountry] = useState<{
    country?: string;
    countryName?: string;
  }>(
    company.countryCode
      ? {
          country: company.countryCode,
          countryName: COUNTRY_CODES.find(
            (c) => c.country === company.countryCode
          )!.countryName,
        }
      : {}
  );

  const [businessType, setBusinessType] = useState<
    keyof typeof businessTypes | undefined
  >(
    company.type
      ? company.type === CompanyTypes.COMPANY
        ? 'limited'
        : 'individual'
      : undefined
  );

  const onBusinessTypeChange = (type: keyof typeof businessTypes) => () => {
    setBusinessType(type);
  };

  return (
    <Wrapper>
      <Header>
        <Typography>Add new merchant</Typography>
      </Header>
      <Content>
        <Title variant="subtitle4">Add new merchant</Title>
        <WrapperTextField>
          <CountrySelectionDropdown
            value={country ? country.countryName : null}
            required
            label="Country"
            onChange={setCountry}
            placeholder="Select your country..."
          />
        </WrapperTextField>
        <WrapperTextField>
          <SelectDropDown
            label="What is your business structure?"
            required
            value={businessType ? businessTypes[businessType] : null}
            placeholder="Choose your business structure"
            fullWidth
          >
            <MenuItem onClick={onBusinessTypeChange('limited')}>
              Limited Company
            </MenuItem>
            <MenuItem onClick={onBusinessTypeChange('individual')}>
              Sole Trader / Individual
            </MenuItem>
          </SelectDropDown>
        </WrapperTextField>
      </Content>
    </Wrapper>
  );
};

export default Create;
