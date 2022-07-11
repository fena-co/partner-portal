import styled from 'styled-components';
import DropdownItems from '../PeriodSelectDropdown/dropdownItems';
import Typography from '../Typography';

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ViewportHeaderContent = styled.div``;

const Subtitle4 = styled(Typography)`
  margin-bottom: 1rem;
`;

const Body1 = styled(Typography)`
  margin-bottom: 1rem;
`;

const FilterDropdown = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  max-height: 2rem;
`;

const Period = styled(Typography)`
  margin-right: 1rem;
`;

interface CustomHeaderProps {
  title: string;
  description: string;
}

const CustomHeader: React.FunctionComponent<CustomHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <Content>
      <ViewportHeaderContent>
        <Subtitle4 variant="subtitle4">{title}</Subtitle4>
        <Body1 variant="body1">
          {description}
        </Body1>
      </ViewportHeaderContent>
      <FilterDropdown>
        <Period variant="body4">Period:</Period>
        <DropdownItems />
      </FilterDropdown>
    </Content>
  );
};

export default CustomHeader;
