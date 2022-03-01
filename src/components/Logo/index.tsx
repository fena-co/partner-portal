import { FC } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Fena from 'image/logo.svg';

const WrapperLogo = styled.div`
  cursor: pointer;
`;

interface ILogo {
  size?: string;
}

const Logo: FC<ILogo> = (props: any) => {
  const router = useRouter();

  return (
    <WrapperLogo onClick={() => router.push('/')}>
      <Fena />
    </WrapperLogo>
  );
};

export default Logo;
