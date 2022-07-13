import ArrowDown from 'image/icon/arrow-down.svg';
import ArrowUp from 'image/icon/arrow-up.svg';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import MenuItem from '../MenuItem';
import Typography from '../Typography';
import ArrowDownAccordion from 'image/icon/arrow-down-1.svg';

const FullWidth = css`
  width: 100%;
`;

const DropDownContainer = styled.div<{ fullWidth?: boolean }>`
  ${({ fullWidth }) => (fullWidth ? FullWidth : '')}
  position: relative;
  padding-top: 20px;
`;

const BorderError = css`
  border-color: #38b6ff;
`;

const DefaultBorder = css`
  border-color: #dbe3eb;
`;

interface DropDownHeaderProps {
  error?: string;
  isOpen?: boolean;
}

const DropDownHeader = styled.div<DropDownHeaderProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  border-radius: 5px;
  padding: 15px;
  min-height: 18px;
  position: relative;
  ${({ error, isOpen }) => (error && !isOpen ? BorderError : DefaultBorder)}
  ${({ isOpen }) =>
    isOpen
      ? css`
          border: 1px solid #027aff;
        `
      : ''}
`;

interface ValueSelectProps {
  leftIcon?: boolean;
  isPlaceholder?: boolean;
}

const ValueSelect = styled.span<ValueSelectProps>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: ${({ isPlaceholder }) => (isPlaceholder ? '#9898AD' : '#13273f')};
`;

interface DropDownListContainerProps {
  isOpen?: boolean;
}

const DropDownListContainer = styled.div<DropDownListContainerProps>`
  position: absolute;
  width: 100%;
  z-index: 99;

  ${({ isOpen }) => (isOpen ? 'border: 1px solide blue;' : '')}
`;

const DropDownList = styled.ul`
  border: 1px solid #dbe3eb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0;
  margin-top: 8px;
  background: #fff;
  height: 300px;
  overflow-y: scroll;
`;

const ErrorMessage = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #38b6ff;
  margin-top: 5px;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const FieldLabel = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 8px;
  line-height: 17px;
`;

const SearchInput = styled.input`
  border: none;
  padding: 15px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  ::placeholder {
    color: #8181a5;
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
`;

const CategoryTitle = styled(Typography)``;

const StyledArrowDown = styled(ArrowDownAccordion)`
  transform: ${(props) =>
    props[`aria-expanded`] ? `rotate(180deg)` : `rotateZ(0deg)`};
`;

const StyledMenuItem = styled(MenuItem)`
  font-size: 14px;
  padding: 5px 30px;
`;

interface Item {
  label: string;
  value: string;
}

interface DeepItem {
  label: string;
  items: (Item | DeepItem)[];
}

interface DropdownFormFieldProps {
  items: (Item | DeepItem)[];

  variant?: string;
  leftIcon?: any;
  value?: any;
  error?: string;
  style?: any;
  placeholder?: string;
  onChange: (value: any) => void;
  label?: string;
  required?: boolean;
}

const DropdownFormField: FC<DropdownFormFieldProps> = ({ items, label, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState<string | undefined>();
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>();
  const ref = useRef(null);
  const valueRef = useRef(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  };

  const handlerSubItemExpand = (val: number) => {
    setExpandedItemIndex(val);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    setSearchString(q);
  };

  useEffect(() => {
    const clickOnWindows = (e: any) => {
      if (
        ref.current !== e.target &&
        e.target !== valueRef.current &&
        e.target !== searchRef.current
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', clickOnWindows);

    return () => window.removeEventListener('click', clickOnWindows);
  }, []);

  const filterItems = (item: any) => {
    if (item.label.toLowerCase().includes(q.toLowerCase())) {
      return true;
    } else if (item.value) {
      return item.value.toString().toLowerCase().includes(q.toLowerCase());
    } else if (item.items) {
      return item.items.filter(filterItems).length;
    }
  };

  return (
    <DropDownContainer>
      {label && (
        <FieldLabel>
          {label}{' '}
          {required && <span style={{ color: 'red' }}>*</span>}
        </FieldLabel>
      )}
      <DropDownHeader
        error={props.error}
        isOpen={isOpen}
        onClick={handleExpand}
        ref={ref}
      >
        {props.leftIcon && (
          <IconWrapper>
            <props.leftIcon />
          </IconWrapper>
        )}
        <ValueSelect
          ref={valueRef}
          leftIcon={props.leftIcon}
          isPlaceholder={!props.value && !!props.placeholder}
        >
          {props.value ? props.value : props.placeholder}
        </ValueSelect>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </DropDownHeader>
      {isOpen && (
        <div>
          {/* added stopPropahation to prevent dropdown close */}
          <DropDownListContainer onClick={(e) => e.stopPropagation()}>
            {' '}
            <DropDownList>
              <SearchInput
                ref={searchRef}
                value={searchString}
                onChange={handleSearch}
                placeholder="Search..."
              />
              {items.filter(filterItems)?.map((el, index) => {
                return (
                  <div key={el.category}>
                    <Category
                      onClick={() => {
                        handlerSubItemExpand(index);
                      }}
                    >
                      <CategoryTitle variant="body1">
                        {el.category}
                      </CategoryTitle>
                      <StyledArrowDown
                        aria-expanded={
                          expandedItemIndex === index
                        }
                      />
                    </Category>
                    {el.specifics.map((item) => {
                      return (
                        expandedItemIndex === index && (
                          <StyledMenuItem
                            onClick={() => {
                              props.onChange(item);
                              setIsOpen(!isOpen);
                            }}
                            key={item}
                          >
                            {item}
                          </StyledMenuItem>
                        )
                      );
                    })}
                  </div>
                );
              })}
            </DropDownList>
          </DropDownListContainer>
        </div>
      )}
      {props.error && (
        <ErrorMessage style={{ visibility: isOpen ? 'hidden' : 'visible' }}>
          {props.error}
        </ErrorMessage>
      )}
    </DropDownContainer>
  );
};

export default DropdownFormField;
