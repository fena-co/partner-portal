import { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectDropDown from '.';
import CheckBox from '../Checkbox';
import Datepicker from 'react-datepicker';
import CalendarIcon from 'image/icon/calendar.svg';

const CheckBoxWrapper = styled.div`
  padding: 1rem;
  transition: 500ms;
  &:hover {
    background-color: #f4f7f9;
  }
`;

const CustomDateItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 1rem;
  color: #6c6c8a;
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
  display: flex;
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

const DateFilterContainer = styled.div`
  background: #f4f7f9;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #13273f;
  margin-bottom: 15px;
  font-family: Montserrat;
`;

const RangeSubscript = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  margin: 0 13px;
  color: #8181a5;
  font-family: Montserrat;
`;

const RangePickers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type FilterObj = {
  periods?: {
    currentValue?: string;
  };
  customPeriod?: {
    from: Date;
    to: Date;
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

const DropdownItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] = useState<FilterObj>({
    customPeriod: { from: new Date(), to: new Date() },
    periods: { currentValue: 'Last 7 days' },
  });

  const handleExpand = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (filter.periods?.currentValue === 'Custom' && !filter.customPeriod) {
      setFilter({
        ...filter,
        customPeriod: { from: new Date(), to: new Date() },
      });
    } else if (
      filter.periods?.currentValue !== 'Custom' &&
      filter.customPeriod
    ) {
      setFilter({ ...filter, customPeriod: undefined });
    }
  }, [filter]);

  return (
    <SelectDropDown
      handleExpand={handleExpand}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      value={filter.periods?.currentValue}
      fullWidth
    >
      {/* Added e.stopPropagation to prevent dropdown close on item`s click. Check selectDropdown for reference */}
      <div onClick={(e) => e.stopPropagation()}>
        <CheckBoxWrapper>
          <CheckBox
            onChange={(e) => {
              if (e.target.checked) {
                setFilter({
                  ...filter,
                  periods: { currentValue: 'Last 7 days' },
                });
              } else {
                setFilter({
                  ...filter,
                  periods: { currentValue: undefined },
                  customPeriod: undefined,
                });
              }
            }}
            checked={filter.periods?.currentValue === 'Last 7 days'}
            label="Last 7 days"
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <CheckBox
            onChange={(e) => {
              if (e.target.checked) {
                setFilter({
                  ...filter,
                  periods: { currentValue: 'Last 28 days' },
                });
              } else {
                setFilter({
                  ...filter,
                  periods: { currentValue: undefined },
                });
              }
            }}
            checked={filter.periods?.currentValue === 'Last 28 days'}
            label="Last 28 days"
          />
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <CheckBox
            onChange={(e) => {
              if (e.target.checked) {
                setFilter({
                  ...filter,
                  periods: { currentValue: 'Last year' },
                });
              } else {
                setFilter({
                  ...filter,
                  periods: { currentValue: undefined },
                });
              }
            }}
            checked={filter.periods?.currentValue === 'Last year'}
            label="Last year"
          />
        </CheckBoxWrapper>
        <CustomDateItem>
          <CheckBox
            label="Custom"
            onChange={(e) => {
              if (e.target.checked) {
                setFilter({
                  ...filter,
                  customPeriod: { from: new Date(), to: new Date() },
                  periods: { currentValue: 'Custom' },
                });
              } else {
                setFilter({
                  ...filter,
                  customPeriod: undefined,
                  periods: { currentValue: undefined },
                });
              }
            }}
            checked={filter.periods?.currentValue === 'Custom'}
          />{' '}
        </CustomDateItem>
        {filter.periods?.currentValue === 'Custom' ? (
          <DateFilterContainer>
            <>
              <Text>Is between</Text>
              <RangePickers>
                <Datepicker
                  value={filter['customPeriod']?.from.toLocaleDateString(
                    'en-UK'
                  )}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      customPeriod: {
                        from: new Date(e || ''),
                        to: filter['customPeriod']?.to || new Date(),
                      },
                    });
                  }}
                  customInput={<CustomDatepickerInput />}
                />
                <RangeSubscript>and</RangeSubscript>
                <Datepicker
                  value={filter['customPeriod']?.to.toLocaleDateString('en-UK')}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      customPeriod: {
                        to: new Date(e || ''),
                        from: filter['customPeriod']?.from || new Date(),
                      },
                    });
                  }}
                  customInput={<CustomDatepickerInput />}
                />
              </RangePickers>
            </>
          </DateFilterContainer>
        ) : null}
      </div>
    </SelectDropDown>
  );
};

export default DropdownItems;
