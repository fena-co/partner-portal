import styled from 'styled-components';

const Hypertext = styled.a`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #38b6ff;
  cursor: pointer;
  margin: 0;
  &:hover {
    text-decoration-line: underline;
  }
  &:active {
    text-decoration-line: underline;
    color: #6c6c8a;
  }
`;

export default Hypertext;
