import ArrowDown from 'image/icon/arrow-down.svg';
import ArrowUp from 'image/icon/arrow-up.svg';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import MenuItem from '../MenuItem';
import Typography from '../Typography';
import ArrowDownAccordion from 'image/icon/arrow-down-1.svg';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';

const DropDownContainer = styled.div`
  position: relative;
`;

interface DropDownHeaderProps {
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
  border-color: #dbe3eb;
  ${({ isOpen }) =>
    isOpen
      ? css`
          border: 1px solid #027aff;
        `
      : ''}
`;

interface ValueSelectProps {
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

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
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

const CategoryTitleWrapper = styled.div`
  display: flex;
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

const FlagContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const StyledFlagIcon = styled(FlagIcon)`
  height: 50%;
`;

const CountryFlagIcon: React.FunctionComponent<{
  code: FlagIconCode;
}> = ({ code }) => (
  <FlagContainer>
    <StyledFlagIcon code={code} />
  </FlagContainer>
);

interface Item {
  label: string;
  value: string;
}

interface DeepItem {
  label: string;
  items: Item[];
}

interface DropdownProps {
  items: (Item | DeepItem)[];
  leftIcon?: () => JSX.Element;
  // variant?: 'error' | 'success' | 'active' | 'default';
  value?: Item;
  placeholder?: string;
  withCountryFlags?: boolean;
  onChange: (value: Item) => void;
}

const Dropdown: FC<DropdownProps> = ({
  items,
  onChange,
  leftIcon,
  value,
  placeholder,
  withCountryFlags,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState<string>('');
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>();
  const ref = useRef(null);
  const valueRef = useRef(null);
  const searchRef = useRef<HTMLInputElement>(null);

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

  const handleExpand = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  };

  const handlerSubItemExpand = (val: number) => () => {
    setExpandedItemIndex(val);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    setSearchString(q);
  };

  const handleItemClick = (item: Item) => () => {
    onChange(item);
    setIsOpen(!isOpen);
  };

  const filterItems = (item: any) => {
    if (item.label?.toLowerCase().includes(searchString.toLowerCase())) {
      return true;
    } else if (item.value) {
      return item.value
        .toString()
        .toLowerCase()
        .includes(searchString.toLowerCase());
    } else if (item.items) {
      return item.items.filter(filterItems).length;
    }
  };

  return (
    <DropDownContainer>
      <DropDownHeader ref={ref} isOpen={isOpen} onClick={handleExpand}>
        <ValueSelect ref={valueRef} isPlaceholder={!value && !!placeholder}>
          {leftIcon && <IconWrapper>{leftIcon()}</IconWrapper>}
          {value ? value.label : placeholder}
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
              {items.filter(filterItems).map((el, index) => {
                const isDeepItem = (el as any).value === undefined;
                return (
                  <div key={el.label}>
                    <Category
                      onClick={
                        isDeepItem
                          ? handlerSubItemExpand(
                              index === expandedItemIndex ? -1 : index
                            )
                          : handleItemClick(el as any)
                      }
                    >
                      <CategoryTitleWrapper>
                        {withCountryFlags && <CountryFlagIcon code={(el as any).value} />}
                        <CategoryTitle variant="body1">{el.label}</CategoryTitle>
                      </CategoryTitleWrapper>
                      {isDeepItem && (
                        <StyledArrowDown
                          aria-expanded={expandedItemIndex === index}
                        />
                      )}
                    </Category>
                    {isDeepItem &&
                      (el as DeepItem).items.map((item) => {
                        return (
                          expandedItemIndex === index && (
                            <StyledMenuItem
                              onClick={handleItemClick(item)}
                              key={item.label}
                            >
                              {item.label}
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
    </DropDownContainer>
  );
};

export default Dropdown;
