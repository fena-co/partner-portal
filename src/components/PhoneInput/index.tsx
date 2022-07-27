import ArrowDown from 'image/icon/arrow-down.svg';
import ArrowUp from 'image/icon/arrow-up.svg';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
import styled, { css } from 'styled-components';
import { COUNTRY_CODES } from '../../constant/countries';
import MenuItem from '../MenuItem';
import InputMask, { Props } from 'react-input-mask';

const borderVariants = {
  error: css`
    border-color: #ef6355;
  `,
  success: css`
    border-color: #2cd19e;
  `,
  default: css`
    border-color: #dbe3eb;
  `,
  active: css`
    border-color: #027aff;
  `,
};

const DropDownContainer = styled.div`
  position: relative;
`;

interface WrapperTextField {
  variant?: 'error' | 'success' | 'active' | 'default';
  disabled?: boolean;
  isOpen?: boolean;
}

const DropDownHeader = styled.div<WrapperTextField>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  border-radius: 5px;
  padding: 0 14px;
  position: relative;
  ${({ variant }) => borderVariants[variant || 'default']}
  &:focus-within {
    ${({ variant }) =>
      variant === 'error' ? borderVariants[variant] : borderVariants['active']}
  }
  ${({ isOpen }) =>
    isOpen
      ? css`
          border: 1px solid #027aff;
        `
      : ''}
  background-color:  ${({ disabled }) => (disabled ? '#f4f7f9db' : 'initial')};
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
  z-index: -1;
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
  overflow-y: scroll;
`;

const ErrorMessage = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ef6355;
  margin-top: 5px;
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
  padding: 14px 10px 14px 0;
  display: flex;
  align-items: center;
  border-right: 1px solid #dbe3eb;
`;

const TextField = styled(InputMask)<Props>`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  border: none;
  width: 100%;
  padding-left: 10px;

  outline: none;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #0e233e;

  &:disabled {
    background: #f4f7f9db;
  }

  ::placeholder {
    color: #9898ad;
  }
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

const ArrowWrapper = styled.div`
  display: flex;
  margin-left: 5px;
`;

const StyledFlagIcon = styled(FlagIcon)`
  margin-right: 5px;
  height: 50%;
`;

interface ISelectDropdown {
  disabled?: boolean;
  leftIcon?: any;
  value?: any;
  code?: FlagIconCode;
  error?: string;
  style?: any;
  fullWidth?: boolean;
  placeholder?: string;
  onChange: (value: any) => void;
  label?: string;
  required?: boolean;
  variant?: 'error' | 'success' | 'active' | 'default';
}

const PhoneInput: FC<ISelectDropdown> = (props) => {
  const [codeDropdownOpen, setCodeDropdownOpen] = useState(false);
  const [codeValue, setCodeValue] = useState<FlagIconCode>(
    props.value?.code || 'GB'
  );
  const [countriesList, setCountriesList] = useState(COUNTRY_CODES);
  const [searchString, setSearchString] = useState<string | undefined>();
  const ref = useRef(null);
  const valueRef = useRef(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    !props.disabled && setCodeDropdownOpen(!codeDropdownOpen);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
    setCountriesList(
      COUNTRY_CODES.filter((c) =>
        c.countryName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const code = COUNTRY_CODES.find((c) => c.country === codeValue)?.code;
    props.onChange?.({ code: code, number: event.target.value });
  };

  useEffect(() => {
    const clickOnWindows = (e: any) => {
      if (ref.current !== e.target && e.target !== valueRef.current) {
        setCodeDropdownOpen(false);
      }
    };
    window.addEventListener('click', clickOnWindows);

    return () => window.removeEventListener('click', clickOnWindows);
  }, []);

  return (
    <DropDownContainer>
      {props.label && (
        <FieldLabel>
          {props.label}{' '}
          {props.required && <span style={{ color: 'red' }}>*</span>}
        </FieldLabel>
      )}
      <DropDownHeader
        variant={props.variant}
        disabled={props.disabled}
        isOpen={codeDropdownOpen}
      >
        <FlagContainer onClick={handleExpand} ref={ref}>
          <ValueSelect>
            <StyledFlagIcon ref={valueRef} code={codeValue} />
            &nbsp;
            {COUNTRY_CODES.find((c) => c.country === codeValue)?.code}
            <ArrowWrapper>
              {codeDropdownOpen ? <ArrowUp /> : <ArrowDown />}
            </ArrowWrapper>
          </ValueSelect>
        </FlagContainer>
        <TextField
          placeholder={props.placeholder}
          disabled={props.disabled}
          mask={''}
          value={props.value?.number}
          onChange={handlePhoneChange}
        />
      </DropDownHeader>
      {codeDropdownOpen && (
        <DropDownListContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DropDownList>
            <SearchInput
              ref={searchRef}
              value={searchString}
              onChange={handleSearch}
              placeholder="Search..."
            />
            {countriesList?.map((country, index) => {
              return (
                <div key={index}>
                  <MenuItem
                    onClick={() => {
                      setCodeValue(country.country);
                      setCodeDropdownOpen(false);
                    }}
                  >
                    <StyledFlagIcon code={country.country} />
                    &nbsp;{country.code} {country.countryName}
                  </MenuItem>
                </div>
              );
            })}
          </DropDownList>
        </DropDownListContainer>
      )}
      {props.error && (
        <ErrorMessage
          style={{ visibility: codeDropdownOpen ? 'hidden' : 'visible' }}
        >
          {props.error}
        </ErrorMessage>
      )}
    </DropDownContainer>
  );
};

export default PhoneInput;
