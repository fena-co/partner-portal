import React, { useState } from 'react';
import styled from 'styled-components';
import ThreeDots from 'image/icon/three-dots.svg';
import Typography from '../Typography';

const Menu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  & > .dropdown {
    position: relative;

    & > a {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
      transform: translate(-50%, -50%);

      :hover {
        background: #ffffff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
        border-radius: 3px;
      }
    }
  }
`;

const MenuContent = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 22px 18px;
  top: 20px;
  right: 0;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 2px 25px rgba(129, 129, 165, 0.2);
  border-radius: 5px;
  width: max-content;
  min-width: 166px;
  z-index: 2;

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
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 18px;
`;

const MenuItem = styled.div<{ color?: string }>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  padding: 5px 0;
  text-transform: capitalize;
  cursor: pointer;

  & > a {
    display: block;
    text-align: left;
    text-decoration: none;
    ${({ color }) => (color ? `color: ${color}` : '')};
  }

  :hover {
    color: #2cd19e;
  }
`;

interface ContextMenuProps {
  actions: {
    label: string;
    color?: string;
    onClick: () => void;
  }[];
}

function ContextMenu(props: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu>
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
      <li
        className="dropdown"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <a>
          <ThreeDots />
        </a>

        <MenuContent isOpen={isOpen}>
          <MenuHeader>
            <Typography variant="body4" color="#8181A5">
              ACTIONS
            </Typography>
          </MenuHeader>
          {props.actions.map((action) => (
            <MenuItem key={action.label} color={action.color}>
              <a onClick={action.onClick}>{action.label}</a>
            </MenuItem>
          ))}
        </MenuContent>
      </li>
    </Menu>
  );
}

export default ContextMenu;
