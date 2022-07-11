import styled, { css } from 'styled-components';

const H1 = css`
  font-weight: bold;
  font-size: 48px;
  line-height: 60px;
`;

const H2 = css`
  font-weight: bold;
  font-size: 36px;
  line-height: 54px;
`;

const H3 = css`
  font-weight: bold;
  font-size: 26px;
  line-height: 40px;
`;

const Subtitle1 = css`
  font-weight: normal;
  font-size: 46px;
  line-height: 56px;
`;
const Subtitle2 = css`
  font-weight: 600;
  font-size: 34px;
  line-height: 43px;
`;
const Subtitle3 = css`
  font-weight: 500;
  font-size: 26px;
  line-height: 36px;
`;
const Subtitle4 = css`
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
`;
const Subtitle5 = css`
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
`;

const Body1 = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
`;

const Body2 = css`
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
`;

const Body3 = css`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
`;

const Body4 = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

const Body5 = css`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

const LightBody = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

const variants = {
  h1: H1,
  h2: H2,
  h3: H3,
  subtitle1: Subtitle1,
  subtitle2: Subtitle2,
  subtitle3: Subtitle3,
  subtitle4: Subtitle4,
  subtitle5: Subtitle5,
  body1: Body1,
  body2: Body2,
  body3: Body3,
  body4: Body4,
  body5: Body5,
  lightBody: LightBody,
};

const Typography = styled.p<{
  variant?: keyof typeof variants;
  clickable?: boolean;
}>`
  font-family: Montserrat;
  color: ${(props: any) => props.color || '#25282b'};
  margin: 0;
  ${({ variant }) => (variant ? variants[variant] : '')}
  ${({ clickable }) => clickable && 'cursor: pointer;'}
`;

export default Typography;
