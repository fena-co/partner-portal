import ArrowDown from 'image/icon/arrow-down.svg';
import ArrowUp from 'image/icon/arrow-up.svg';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { FlagIcon } from 'react-flag-kit';
import styled, { css } from 'styled-components';
import { COUNTRY_CODES } from '../../constant/countries';
import MenuItem from '../MenuItem';

const FullWidth = css`
  width: 100%;
`;

const DropDownContainer = styled.div<{ fullWidth?: boolean }>`
  ${({ fullWidth }) => (fullWidth ? FullWidth : '')}
  position: relative;
  padding-top: 20px;
`;

const BorderError = css`
  border-color: #38b6ff;
`;

const DefaultBorder = css`
  border-color: #dbe3eb;
`;

const DropDownHeader = styled.div<{
  error?: string;
  isOpen?: boolean;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  border-radius: 5px;
  padding: 14px;
  position: relative;
  ${({ error, isOpen }) => (error && !isOpen ? BorderError : DefaultBorder)}
  ${({ isOpen }) =>
    isOpen
      ? css`
          border: 1px solid #027aff;
        `
      : ''}
`;

const ValueSelect = styled.span<{
  leftIcon?: boolean;
  isPlaceholder?: boolean;
}>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: ${({ isPlaceholder }) => (isPlaceholder ? '#9898AD' : '#13273f')};
`;

const DropDownListContainer = styled.div<{
  isOpen?: boolean;
}>`
  position: absolute;
  width: 100%;
  z-index: 99;

  ${({ isOpen }) => (isOpen ? 'border: 1px solide blue;' : '')}
`;

const DropDownList = styled.ul`
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0;
  margin-top: 8px;
  background: #fff;
  height: 300px;
  overflow: scroll;
`;

const ErrorMessage = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #38b6ff;
  margin-top: 5px;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const FieldLabel = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 8px;
  line-height: 17px;
`;

const FlagContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const StyledFlagIcon = styled(FlagIcon)`
  width: 100%;
`;

const SearchInput = styled.input`
  border: none;
  padding: 15px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  ::placeholder {
    color: #8181a5;
  }
`;

interface ISelectDropdown {
  variant?: string;
  leftIcon?: any;
  value?: any;
  error?: string;
  style?: any;
  fullWidth?: boolean;
  placeholder?: string;
  onChange: (value: any) => void;
  label?: string;
  required?: boolean;
}

const CountrySelectionDropdown: FC<ISelectDropdown> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState<string | undefined>();
  const [countriesList, setCountriesList] = useState(COUNTRY_CODES);
  const ref = useRef(null);
  const valueRef = useRef(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
    setCountriesList(
      COUNTRY_CODES.filter((c) =>
        c.countryName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const clickOnWindows = (e: any) => {
      if (
        ref.current !== e.target &&
        e.target !== valueRef.current &&
        e.target !== searchRef.current
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', clickOnWindows);

    return () => window.removeEventListener('click', clickOnWindows);
  }, []);

  return (
    <DropDownContainer fullWidth={props.fullWidth}>
      {props.label && (
        <FieldLabel>
          {props.label}{' '}
          {props.required && <span style={{ color: 'red' }}>*</span>}
        </FieldLabel>
      )}
      <DropDownHeader
        error={props.error}
        isOpen={isOpen}
        onClick={handleExpand}
        ref={ref}
      >
        {props.leftIcon && (
          <IconWrapper>
            <props.leftIcon />
          </IconWrapper>
        )}
        <ValueSelect
          ref={valueRef}
          leftIcon={props.leftIcon}
          isPlaceholder={!props.value && !!props.placeholder}
        >
          {props.value ? (
            <>
              <FlagContainer>
                <StyledFlagIcon
                  code={
                    COUNTRY_CODES.find((c) => c.countryName === props.value)!
                      .country
                  }
                />
              </FlagContainer>
              {props.value}
            </>
          ) : (
            props.placeholder
          )}
        </ValueSelect>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            <SearchInput
              ref={searchRef}
              value={searchString}
              onChange={handleSearch}
              placeholder="Search..."
            />
            {countriesList.map((country) => {
              return (
                <MenuItem
                  onClick={() => props.onChange(country)}
                  key={country.country}
                >
                  <FlagContainer>
                    <StyledFlagIcon code={country.country} />
                  </FlagContainer>
                  {country.countryName}
                </MenuItem>
              );
            })}
          </DropDownList>
        </DropDownListContainer>
      )}
      {props.error && (
        <ErrorMessage style={{ visibility: isOpen ? 'hidden' : 'visible' }}>
          {props.error}
        </ErrorMessage>
      )}
    </DropDownContainer>
  );
};

export default CountrySelectionDropdown;
