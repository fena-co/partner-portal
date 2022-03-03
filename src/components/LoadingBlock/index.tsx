import { FC } from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner';

const Wrapper = styled.div<{ minHeight: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ minHeight }) => minHeight}px;
`;

export interface LoadingBlockProps {
  loading?: boolean;
  minHeight?: number;
}

export const LoadingBlock: FC<LoadingBlockProps> = ({
  children,
  loading,
  minHeight = 200,
}) => {
  if (loading)
    return (
      <Wrapper minHeight={minHeight}>
        <Spinner width={50} height={50} />
      </Wrapper>
    );

  return <>{children}</>;
};
