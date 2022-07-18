import styled from 'styled-components';
import CalendarIcon from 'image/icon/calendar.svg';
import Datepicker from 'react-datepicker';
import { forwardRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const InputWrapper = styled.div`
  display: flex;
  height: 50px;
  background: #ffffff;
  border: 1px solid #c2cedb;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #0e233e;

  &:focus {
    border: none;
  }
`;

const CalendarWrapper = styled.div`
  margin-right: 12px;
  display: flex;
  width: 42px;
  border-right: 1px solid #c2cedb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FieldLabel = styled.label`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 8px;
  line-height: 17px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DayInput = (props: any) => {
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    props.value
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const CustomInput = forwardRef((props, ref) => {
    const { value, onClick } = props as any;
    return (
      <InputWrapper>
        <CalendarWrapper
          onClick={(e) => {
            setIsOpen(!isOpen);
          }}
        >
          <CalendarIcon fill="#13273f" />
        </CalendarWrapper>
        <Input {...props} value={value} onClick={onClick} />
      </InputWrapper>
    );
  });
  CustomInput.displayName = 'CustomInput';

  const onChange = (data: any) => {
    setInternalValue(data);
    props.onChange(data);
    setIsOpen(false);
  };

  return (
    <Container>
      {props.label && (
        <FieldLabel>
          {props.label}{' '}
          {props.inputProps?.required && (
            <span style={{ color: 'red' }}>*</span>
          )}
        </FieldLabel>
      )}
      <Datepicker
        value={props.value}
        open={isOpen}
        onInputClick={() => setIsOpen(true)}
        onClickOutside={() => setIsOpen(false)}
        onChange={onChange}
        selected={internalValue}
        dateFormat="dd/MM/yyyy"
        customInput={<CustomInput />}
      />
    </Container>
  );
};

export default DayInput;
