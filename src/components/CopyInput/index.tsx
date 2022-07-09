import styled from 'styled-components';
import Typography from '../Typography';
import ReactTooltip from 'react-tooltip';

const CopilerWrapper = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const CopilerInput = styled.input`
  border: 1px solid #dbe3eb;
  padding: 9px 20px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: none;

  width: 100%;
  outline: none;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #0e233e;

  &:disabled {
    color: #c6d1dd;
    background: #ffffff;
  }

  &:focus {
    outline: none;
  }
`;

const CopyButton = styled.div`
  padding: 10px 22px;
  background: #38b6ff;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledReactTooltip = styled(ReactTooltip)`
  font-family: Montserrat;
  width: 70px;
`;

interface CopyInputProps {
  value: string;
}

const CopyInput: React.FunctionComponent<CopyInputProps> = ({ value }) => {
  return (
    <CopilerWrapper>
      <StyledReactTooltip id="previewCopyBtn" />

      <CopilerInput value={value} onChange={() => {}} />
      <span
        data-effect="solid"
        data-for="previewCopyBtn"
        data-background-color="#2b2b2bd9"
        data-place="right"
        data-tip="Copied to clipboard"
        data-event="click"
        data-event-off="mouseleave"
        data-iscapture
      >
        <CopyButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const el = document.createElement('textarea');
            el.value = value;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
          }}
        >
          <Typography variant="body4" color="#ffffff">
            Copy
          </Typography>
        </CopyButton>
      </span>
    </CopilerWrapper>
  );
};

export default CopyInput;
