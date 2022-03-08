import styled, { css } from 'styled-components';

const ButtonContained = css`
  background: #13273f;
  color: #ffffff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #19385e;
    filter: drop-shadow(0px 7px 20px rgba(108, 108, 138, 0.6));
  }
  &:disabled {
    background: #dbe3eb;
    filter: none;
    cursor: not-allowed;
  }
`;

const ButtonOutlined = css`
  background-color: #ffffff;
  border: 1px solid #c2cedb;
  color: #13273f;
  cursor: pointer;

  &:hover {
    box-sizing: border-box;
    border: 1px solid #13273f;
  }
  &:disabled {
    border: 1px solid #dbe3eb;
    box-sizing: border-box;
    color: #dbe3eb;
    cursor: not-allowed;
  }
`;

const ButtonText = styled.button<{ variant: string }>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 5px;

  ${({ variant }) =>
    variant === `contained` ? ButtonContained : ButtonOutlined}
`;

export default ButtonText;
