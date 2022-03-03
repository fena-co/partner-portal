import styled from 'styled-components';
import { useRouter } from 'next/router';

import Typography from '../../Typography';
import MenuItem from './MenuItem';
import Submenu from './Submenu';

import { MENU_ICON_SUPPORT } from '../../../constant/navbar';
import { ROUTES } from '../../../constant/route';

import LogoutIcon from 'image/icon/navbar/logout.svg';
import { NavbarElementProps } from 'react-day-picker';
import { MenuItemInterface } from '..';

const Container = styled.ul`
  display: flex;
  flex-direction: column;

  min-width: 239px;
  padding: 44px 0px;
  list-style-type: none;
  margin: 0;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;

  height: calc(100vh - 84px - 88px);
`;

const LogoutWrapper = styled.div`
  padding: 12px 30px 9px 30px;
  display: flex;
  cursor: pointer;

  margin-top: auto;
`;

const Logout = styled(LogoutIcon)`
  fill: #8181a5;
  margin-right: 13px;
`;

const Navbar = ({ menuItems }: { menuItems?: MenuItemInterface[] }) => {
  const router = useRouter();

  return (
    <Container>
      {menuItems?.map((item) => (
        <MenuItem
          key={item.pathName}
          isActive={router.pathname.startsWith(item.pathName)}
          menuName={item.menuName}
          onClick={() => router.push(item.pathName)}
        />
      ))}
    </Container>
  );
};

export default Navbar;
