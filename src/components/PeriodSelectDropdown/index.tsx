import Select from 'react-dropdown-select';
import styled from 'styled-components';

const StyledItem = styled.div`
  padding: 10px;
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  > div {
    display: flex;
    align-items: center;
  }
  input {
    margin-right: 10px;
  }
  :hover {
    background: #f2f2f2;
  }
`;

const PeriodSelectDropdown = () => {
  const options = [{ label: 'Last 28 days' }, { label: 'Last 7 days' }];

  return (
    <Select
      multi
      options={options}
      values={[]}
      itemRenderer={({ item, methods }) => (
        <StyledItem>
          {item.disabled ? (
            <div aria-disabled>{item.label}</div>
          ) : (
            <div onClick={() => methods.addItem(item)}>
              <input
                onChange={() => methods.addItem(item)}
                type="checkbox"
                checked={methods.isSelected(item)}
              />{' '}
              {item.label}
            </div>
          )}
        </StyledItem>
      )}
      onChange={(value) =>
        console.log(
          `%c > onChange ${title} `,
          'background: #555; color: tomato',
          value
        )
      }
    />
  );
};

export default PeriodSelectDropdown;
