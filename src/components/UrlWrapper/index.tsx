import React from 'react';
import styled from 'styled-components';
import CopyIcon from 'image/icon/copy-icon.svg';
import ReactTooltip from 'react-tooltip';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const UrlInput = styled.input<{ white: boolean; width: number }>`
  display: flex;
  padding-bottom: 10px;
  background: ${({ white }) => (white ? '#fff' : '#f4f7f9')};

  border: 1px solid #dbe3eb;
  border-radius: 5px;
  text-align: center;
  width: ${({ width }) => (width ? `${width}px` : '200')};
  overflow: hidden;
  height: 36px;
  padding: 0 10px;
  font-family: Montserrat;

  @media (max-width: 1500px) {
    min-width: auto;
    max-width: 150px;
  }
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 10px;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  z-index: 0;
  :hover {
    box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.1);
  }
`;

export default function UrlWrapper({ children, whiteBg, width }: any) {
  return (
    <Container>
      <UrlInput width={width} white={whiteBg} value={children} />
      <ReactTooltip id="copyBtn" />

      <CopyButton
        onClick={() => {
          const el = document.createElement('textarea');
          el.value = children;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
        }}
        data-effect="solid"
        data-for="copyBtn"
        data-background-color="#2b2b2bd9"
        data-place="right"
        data-tip="Copied to clipboard"
        data-event="click"
        data-event-off="mouseleave"
        data-iscapture
      >
        <CopyIcon />
      </CopyButton>
    </Container>
  );
}
