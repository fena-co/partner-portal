import styled from 'styled-components';

const SpinnerSvg = ({ width, height }: any) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 22 22`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      animationName: 'spin',
      animationDuration: '2000ms',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
    }}
  >
    <path
      d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11"
      stroke="url(#paint0_linear_3328_1046)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3328_1046"
        x1="2"
        y1="4.30233"
        x2="21.3333"
        y2="5.69598"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2CD19E" />
        <stop offset="1" stopColor="#00F3A8" />
      </linearGradient>
    </defs>
  </svg>
);

const Styled = styled(SpinnerSvg)`
  @keyframes spin {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

const Spinner = ({ width = 22, height = 22 }) => {
  return <Styled width={width} height={height} />;
};

export default Spinner;
