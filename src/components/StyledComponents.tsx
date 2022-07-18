import PlusIcon from 'image/icon/plus.svg';
import styled, { css } from 'styled-components';
import ButtonText from './ButtonText';

export const Container = styled.div``;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 50px;
`;

export const InvoiceBody = styled.div`
  width: 446px;
`;

export const BodyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
`;

export const ButtonCreation = styled(ButtonText)`
  display: flex;
  align-items: center;
  margin-top: 9px;
  margin-bottom: 9px;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ButtonLarge = styled(ButtonText)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

export const Plus = styled(PlusIcon)`
  fill: #fff;
  margin-right: 10px;
`;

export const WrapperIcon = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: ${(props: any) => props.color || ''};
`;

export const Table = styled.table`
  width: 100%;
  position: relative;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const TableHeader = styled.thead<{ fixed?: boolean }>`
  ${({ fixed }) =>
    fixed &&
    css`
      position: sticky;
      top: 0;
      z-index: 1;
    `}
`;

export const TableHeaderCell = styled.th<{ width?: number }>`
  padding: 10px 20px;
  text-align: left;
  border-bottom: 1px solid #dbe3eb;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  color: #13273f;
  ${({ width }) => width && `width: ${width}px;`}
  position: sticky;
  background-color: #fff;
  top: 74px;
  z-index: 1;
`;

export const TableBodyRow = styled.tr`
  cursor: pointer;
  :hover {
    background-color: #f4f7f9;
  }
`;

export const TableBodyCell = styled.td`
  padding: 10px 20px;
  border-bottom: 1px solid #dbe3eb;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 36px;
  color: #13273f;

  :first-child {
    text-align: left;
  }

  :last-child {
    text-align: right;
  }
`;

export const AmmountCell = styled(TableBodyCell)`
  font-weight: 400;
  font-size: 13px;
  line-height: 36px;
  color: #6c6c8a;
`;

export const StatusWrapper = styled.span<{ status: string }>`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  border-radius: 4px;
  text-align: center;
  padding: 5px 10px;
  text-transform: capitalize;

  ${(props) => {
    switch (props.status) {
      case 'sent':
        return SentOrCompletedStatus;
      case 'completed':
        return SentOrCompletedStatus;
      case 'draft':
        return DraftStatus;
      case 'pending':
        return PendingStatus;
      case 'rejected':
        return RejectedStatus;
      case 'refunds':
        return RefundStatus;
      case 'active':
        return SentOrCompletedStatus;
      case 'inactive':
        return DraftStatus;
      case 'disabled':
        return RejectedStatus;
      default:
        return css`
          background-color: #f4f7f9;
          color: #6c6c8a;
        `;
    }
  }}
`;

export const SentOrCompletedStatus = css`
  color: #2cd19e;
  background-color: #e4f9f2;
`;

export const DraftStatus = css`
  background-color: #e6e9ed;
  color: #6c6c8a;
`;

export const PendingStatus = css`
  background: rgba(56, 182, 255, 0.17);
  color: #4285f4;
`;

export const RefundStatus = css`
  background: rgba(25, 56, 93, 0.1);
  color: #19385d;
`;

export const RejectedStatus = css`
  background-color: #fdedee;
  color: #ef6355;
`;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 35px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  background: #ffffff;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 13px;
  line-height: 26px;
  color: #9898ad;
  padding: 4px 17px;
  margin: 0 4px;
  cursor: pointer;

  :hover {
    ${({ disabled }) => (!disabled ? 'background-color: #f4f7f9;' : '')}
  }

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
  `}
`;

export const PaginationMeta = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;
