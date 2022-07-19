import { FC, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ArrowDown from 'image/icon/arrow-down.svg';
import ArrowUp from 'image/icon/arrow-up.svg';
import { useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const FullWidth = css`
  width: 100%;
`;

const Container = styled.div<{ fullWidth?: boolean }>`
  ${({ fullWidth }) => (fullWidth ? FullWidth : '')}
  position: relative;
  height: inherit;
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
  min-height: 18px;
  position: relative;
  ${({ error, isOpen }) => (error && !isOpen ? BorderError : DefaultBorder)}
`;

const ValueSelect = styled.span<{
  leftIcon?: boolean;
  isPlaceholder?: boolean;
}>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ isPlaceholder }) => (isPlaceholder ? '#9898AD' : '#13273f')};
`;

const DropDownListContainer = styled.div`
  position: absolute;
  width: 130%;
  z-index: 1;
  right: 0;
  margin-top: 8px;
`;

const DropDownList = styled.div`
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 8px;
  background: #fff;
  max-height: 300px;
  display: flex;
  flex-direction: column;
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

interface ISelectDropdown {
  leftIcon?: any;
  value?: any;
  rightIcon?: any;
  error?: string;
  style?: any;
  fullWidth?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  isOpen: boolean;
  handleExpand: () => void;
  setIsOpen: (value: boolean) => void;
}

const SelectDropDown: FC<ISelectDropdown> = (props) => {
  const ref = useRef(null);
  const valueRef = useRef(null);

  useEffect(() => {
    const clickOnWindows = (e: any) => {
      if (ref.current !== e.target && e.target !== valueRef.current) {
        props.setIsOpen(false);
      }
    };
    window.addEventListener('click', clickOnWindows);

    return () => window.removeEventListener('click', clickOnWindows);
  }, [props]);

  return (
    <Container style={props.style} fullWidth={props.fullWidth}>
      {props.label && (
        <FieldLabel>
          {props.label}{' '}
          {props.required && <span style={{ color: 'red' }}>*</span>}
        </FieldLabel>
      )}
      <DropDownHeader
        error={props.error}
        isOpen={props.isOpen}
        onClick={props.handleExpand}
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
          {props.value ? props.value : props.placeholder}
        </ValueSelect>
        {props.isOpen ? <ArrowUp /> : <ArrowDown />}
      </DropDownHeader>
      {props.isOpen && (
        <DropDownListContainer>
          <DropDownList>{props.children}</DropDownList>
        </DropDownListContainer>
      )}
      {props.error && (
        <ErrorMessage
          style={{ visibility: props.isOpen ? 'hidden' : 'visible' }}
        >
          {props.error}
        </ErrorMessage>
      )}
    </Container>
  );
};

export default SelectDropDown;
