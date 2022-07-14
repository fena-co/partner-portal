import styled, { css } from 'styled-components';
import { FC } from 'react';
import Spinner from '../Spinner';

const ButtonContained = css`
  background-color: #13273f;
  color: #ffffff;
  border: none;
  font-weight: 600;
  &:hover {
    background-color: #19385e;
    box-sizing: border-box;
    filter: drop-shadow(0px 7px 20px rgba(108, 108, 138, 0.6));
  }
  &:disabled {
    box-sizing: border-box;
    background: #dbe3eb;
    filter: none;
  }
`;

const ButtonOutlined = css`
  background-color: #ffffff;
  font-weight: 600;
  border: 1px solid #dbe3eb;
  color: #0e233e;
  &:hover {
    box-sizing: border-box;
    border: 1px solid #13273f;
  }
  &:disabled {
    border: 1px solid #dbe3eb;
    box-sizing: border-box;
    color: #dbe3eb;
  }
`;

const FullWidth = css`
  width: 100%;
`;

const Button = styled.button<{ fullWidth?: boolean; variant: string }>`
  font-family: Montserrat;
  font-style: normal;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  border-radius: 5px;
  // padding-top: 18px;
  // padding-bottom: 18px;
  padding: 12px 21px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ${({ variant }) =>
    variant === `contained` ? ButtonContained : ButtonOutlined}
  ${({ fullWidth }) => (fullWidth ? FullWidth : '')}
`;

const ButtonWithChildren: FC<any> = ({
  children,
  loading,
  variant,
  ...rest
}) => {
  if (loading) {
    return (
      <Button disabled variant={variant} {...rest}>
        <Spinner />
        Processing
      </Button>
    );
  }

  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonWithChildren;
