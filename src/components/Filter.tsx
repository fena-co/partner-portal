import React, { forwardRef, useState } from 'react';
import FilterIcon from 'image/icon/filter-black.svg';
import styled, { css } from 'styled-components';
import Datepicker from 'react-datepicker';
import CalendarIcon from 'image/icon/calendar.svg';
import moment from 'moment';
import Typography from './Typography';
import CheckBox from './Checkbox';
import 'react-datepicker/dist/react-datepicker.css';

const FilterContainer = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  z-index: 5;
`;

const FilterButton = styled.button`
  background: #ffffff;
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 7px 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;

const FilterContent = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  right: 0;
  margin-top: 6px;
  position: absolute;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(129, 129, 165, 0.35);
  border-radius: 5px;
  min-width: 266px;
  z-index: 99;

  & > a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    &:hover {
      background-color: #f1f1f1;
    }
  }
  @media (max-width: 900px) {
    left: 0;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f4f7f9;
  padding: 10px 18px;
`;

const HeaderButtons = styled.button<{ variant: 'outline' | 'contained' }>`
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 8px 9px;
  ${({ variant }) =>
    variant === `contained` ? ButtonContained : ButtonOutlined}
  cursor: pointer;
`;

const ButtonContained = css`
  background-color: #2cd19e;
  color: #ffffff;
  border: none;

  &:hover {
    background-color: #2cd19e;
  }
`;

const ButtonOutlined = css`
  background-color: #ffffff;
  border: 1px solid #dbe3eb;
  color: #0e233e;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const DateFilterContainer = styled.div`
  background: #f4f7f9;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const RangePickers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RangeSubscript = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  margin: 0 13px;
  color: #8181a5;
  font-family: Montserrat;
`;

const DatepickerInputContainer = styled.div`
  display: flex;
  height: 33px;
  width: 90px;
  background: #ffffff;
  border: 1px solid #c2cedb;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
`;

const CalendarWrapper = styled.div`
  padding: 0 3px;
  display: flex;
  width: 25px;
  align-items: center;
  justify-content: center;
`;

const DatepickerInput = styled.input`
  border: none;
  outline: none;
  width: 100%;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #0e233e;

  &:focus {
    border: none;
  }
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #13273f;
  margin-bottom: 15px;
  font-family: Montserrat;
`;

const MenuItem = styled.div<{ color?: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  padding: 12px 21px;

  border-bottom: 1px solid #dbe3eb;

  &:last-child {
    border-bottom: none;
  }
`;

const TextInput = styled.input`
  outline: none;
  width: 100%;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  line-height: 18px;
  color: #0e233e;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  border-radius: 5px;
  background: #ffffff;
  padding: 5px;

  font-size: 12px;
  text-align: center;

  &:hover {
    border: 1px solid rgba(129, 129, 165, 0.66);
    box-shadow: 0 0 8px rgba(129, 129, 165, 0.25);
  }
`;

type FilterObj = {
  created?: {
    from: Date;
    to: Date;
  };
  dueDate?: {
    from: Date;
    to: Date;
  };
  amount?: {
    from: string;
    to: string;
  };
};

const CustomDatepickerInput = forwardRef((props: any, ref) => {
  return (
    <DatepickerInputContainer {...props}>
      <CalendarWrapper>
        <CalendarIcon fill="#13273f" />
      </CalendarWrapper>
      <DatepickerInput
        value={props.value}
        onChange={(e) => props.onChange(e)}
        style={{
          fontSize: '10px',
          textAlign: 'center',
        }}
      />
    </DatepickerInputContainer>
  );
});
CustomDatepickerInput.displayName = 'CustomDEInput';

interface FilterProps {
  transactions?: boolean;
  onChange?: (filter: FilterObj) => void;
}

const Filter: React.FunctionComponent<FilterProps> = ({
  onChange,
  transactions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilterState] = useState<FilterObj>({});

  const setFilter = (filter: FilterObj) => {
    setFilterState(filter);
    onChange && onChange(filter);
  };
  return (
    <>
      <FilterContainer>
        <FilterButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <FilterIcon /> Filter
        </FilterButton>
        <FilterContent isOpen={isOpen}>
          <Header>
            <HeaderButtons
              onClick={() => {
                setFilter({});
              }}
              variant="outline"
            >
              <Typography variant="body4">Clear</Typography>
            </HeaderButtons>
            <Typography variant="body4">FILTERS</Typography>
            <HeaderButtons
              variant="contained"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <Typography variant="body4" color="#fff">
                Done
              </Typography>
            </HeaderButtons>
          </Header>
          {/* Created At */}
          <>
            <MenuItem>
              <CheckBox
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilter({
                      ...filter,
                      created: {
                        from: moment(new Date()).startOf('day').toDate(),
                        to: moment(new Date()).endOf('day').toDate(),
                      },
                    });
                  } else {
                    setFilter({ ...filter, created: undefined });
                  }
                }}
                checked={filter['created'] !== undefined}
              />{' '}
              Created
            </MenuItem>
            {filter['created'] ? (
              <DateFilterContainer>
                <>
                  <Text>Is between</Text>
                  <RangePickers>
                    <Datepicker
                      value={filter['created']?.from.toLocaleDateString(
                        'en-UK'
                      )}
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          created: {
                            from: new Date(e || ''),
                            to: filter['created']?.to || new Date(),
                          },
                        });
                      }}
                      customInput={<CustomDatepickerInput />}
                    />
                    <RangeSubscript>and</RangeSubscript>
                    <Datepicker
                      includeDateIntervals={[
                        {
                          start: filter.created.from,
                          end: moment().endOf('year').toDate(),
                        },
                      ]}
                      value={filter['created']?.to.toLocaleDateString('en-UK')}
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          created: {
                            to: moment(new Date(e || ''))
                              .endOf('day')
                              .toDate(),
                            from: filter['created']?.from || new Date(),
                          },
                        });
                      }}
                      customInput={<CustomDatepickerInput />}
                    />
                  </RangePickers>
                  {/* <TimezoneWrapper>
                    Time Zone:
                    <RadioButton
                      style={{ marginLeft: '10px' }}
                      inputProps={{ onChange: () => {} }}
                      labelComponent={<>GMT</>}
                    />
                    <RadioButton
                      style={{ marginLeft: '10px' }}
                      inputProps={{ onChange: () => {} }}
                      labelComponent={<>UTC</>}
                    />
                  </TimezoneWrapper> */}
                </>
              </DateFilterContainer>
            ) : null}
          </>

          {/* Due Date */}

          <>
            <MenuItem>
              <CheckBox
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilter({
                      ...filter,
                      dueDate: {
                        from: moment(new Date()).startOf('day').toDate(),
                        to: moment(new Date()).endOf('day').toDate(),
                      },
                    });
                  } else {
                    setFilter({ ...filter, dueDate: undefined });
                  }
                }}
                checked={filter['dueDate'] !== undefined}
              />{' '}
              {!transactions ? 'Due Date' : 'Completed'}
            </MenuItem>
            {filter['dueDate'] ? (
              <DateFilterContainer>
                <>
                  <Text>Is between</Text>
                  <RangePickers>
                    <Datepicker
                      value={filter['dueDate']?.from.toLocaleDateString(
                        'en-UK'
                      )}
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          dueDate: {
                            from: new Date(e || ''),
                            to: filter['dueDate']?.to || new Date(),
                          },
                        });
                      }}
                      customInput={<CustomDatepickerInput />}
                    />
                    <RangeSubscript>and</RangeSubscript>
                    <Datepicker
                      includeDateIntervals={[
                        {
                          start: filter.dueDate.from,
                          end: moment().endOf('year').toDate(),
                        },
                      ]}
                      value={filter['dueDate']?.to.toLocaleDateString('en-UK')}
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          dueDate: {
                            to: moment(new Date(e || ''))
                              .endOf('day')
                              .toDate(),
                            from: filter['dueDate']?.from || new Date(),
                          },
                        });
                      }}
                      customInput={<CustomDatepickerInput />}
                    />
                  </RangePickers>
                  {/* <TimezoneWrapper>
                    Time Zone:
                    <RadioButton
                      style={{ marginLeft: '10px' }}
                      inputProps={{ onChange: () => {} }}
                      labelComponent={<>GMT</>}
                    />
                    <RadioButton
                      style={{ marginLeft: '10px' }}
                      inputProps={{ onChange: () => {} }}
                      labelComponent={<>UTC</>}
                    />
                  </TimezoneWrapper> */}
                </>
              </DateFilterContainer>
            ) : null}
          </>

          {/* Amount */}
          <MenuItem>
            <CheckBox
              onChange={(e) => {
                if (e.target.checked) {
                  setFilter({
                    ...filter,
                    amount: { from: '0', to: '0' },
                  });
                } else {
                  setFilter({ ...filter, amount: undefined });
                }
              }}
              checked={filter['amount'] !== undefined}
            />{' '}
            Amount
          </MenuItem>

          {filter['amount'] ? (
            <DateFilterContainer>
              <>
                <Text>Is between</Text>
                <RangePickers>
                  <TextInput
                    type={'number'}
                    value={filter['amount']?.from}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        amount: {
                          from: e.target.value,
                          to: filter['amount']?.to || '0',
                        },
                      });
                    }}
                  />
                  <RangeSubscript>and</RangeSubscript>
                  <TextInput
                    type={'number'}
                    value={filter['amount']?.to}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        amount: {
                          to: e.target.value,
                          from: filter['amount']?.from || '',
                        },
                      });
                    }}
                  />
                </RangePickers>
              </>
            </DateFilterContainer>
          ) : null}
        </FilterContent>
      </FilterContainer>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '0%',
            left: '0',
            right: '0',
            height: '100vh',
            zIndex: '1',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default Filter;
