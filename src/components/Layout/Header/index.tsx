// import { Auth } from 'aws-amplify';
import Bell from 'image/icon/bell.svg';
import Cog from 'image/icon/cog.svg';
import Person from 'image/icon/person.svg';
import Business from 'image/icon/settings/business.svg';
import ApiKeyIcon from 'image/icon/settings/api-key.svg';
import BusinessIcon from 'image/icon/settings/business.svg';
import ManageIntegrations from 'image/icon/settings/manageIntegrations.svg';
import Terminal from 'image/icon/settings/terminal.svg';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ROUTES } from '../../../constant/route';
// import { resetData as resetCompanyData } from '../../../store/company';
// import { resetData as resetUserData } from '../../../store/user';
import Logo from '../../Logo';

const HeaderContainer = styled.header`
  padding: 23px 46px;
  background: #ffffff;
  box-shadow: 0px 2px 18px rgba(108, 108, 138, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  z-index: 10;
  left: 0;
  right: 0;
`;

const LogoContainer = styled.div`
  width: 240px;
`;

const MenuList = styled.ul<{ moveRight?: boolean }>`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  ${({ moveRight }) => (moveRight ? '' : 'margin-right: auto;')}
`;

const MenuItem = styled.li<{ active?: boolean }>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  margin: 0px 25px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
  color: ${(props: any) => (props.active ? '#2CD19E' : '#13273f')};
  cursor: pointer;
`;

const HeaderButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0px 10px;
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ContextMenuContainer = styled.div<{ width: number }>`
  top: 53px;
  right: 0;
  position: absolute;
  width: ${({ width }) => width || 665}px;
  background: #ffffff;
  box-shadow: 0px 2px 30px rgba(129, 129, 165, 0.15);
  border-radius: 5px;
  padding-bottom: 50px;
`;

const ContextMenuHeader = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 44px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: left;
  color: #8181a5;
  margin-left: 60px;
  margin-top: 20px;
`;

const SettingsMenuItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-top: 20px;
  margin-left: 60px;
`;

const SettingsItemIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #13273f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingsItemText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  letter-spacing: 0.06em;
  text-transform: capitalize;
  padding-left: 16px;
`;

const ContextMenuItem = styled.div`
  text-align: left;
  padding: 25px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  &:hover ${SettingsItemIcon} {
    background: linear-gradient(313.18deg, #2cd19e 19.07%, #00f3a8 87.1%);
  }

  &:hover ${SettingsItemText} {
    ::after {
      content: '';
      background-image: url('/image/icon/settings/arrow.svg');
      background-position: center;
      background-repeat: no-repeat;
      width: 13px;
      height: 13px;
      position: absolute;
      margin-left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const ContextMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  cursor: default;
`;

// const menus = [
//   {
//     name: 'Transactions',
//     pathName: ROUTES.TRANSACTION,
//   },
//   {
//     name: 'Payments',
//     pathName: ROUTES.PAYMENT,
//   },
//   /*{
//     name: 'Products',
//     pathName: ROUTES.PRODUCT,
//   },*/
// ];

const homeMenus = [
  {
    name: 'Login',
    pathName: ROUTES.LOGIN,
  },
  {
    name: 'Sign up',
    pathName: ROUTES.SIGN_UP,
  },
];

const settingsItems = [
  {
    title: 'Business Details',
    icon: <BusinessIcon />,
    route: '',
  },
  {
    title: 'API Keys',
    icon: <ApiKeyIcon />,
    route: ROUTES.API_KEYS,
  },

  // {
  //   title: 'Business details',
  //   icon: <Business />,
  //   route: ROUTES.BUSINESS_DETAILS,
  // },
  // {
  //   title: 'Manage integrations',
  //   icon: <ManageIntegrations />,
  //   route: ROUTES.MANAGE_INTEGRATIONS,
  // },
  // {
  //   title: 'Manage bank accounts',
  //   icon: <ManageBank />,
  //   route: ROUTES.MANAGE_BANK_ACCOUNT,
  // },
  // {
  //   title: 'Terminal management',
  //   icon: <Terminal />,
  //   route: ROUTES.TERMINAL_SETTINGS,
  // },
];

const Header = ({ variant }: { variant: 'home' | 'dashboard' }) => {
  const router = useRouter();
  // const dispatch = useDispatch();

  const [settingOpen, setSettingOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isMenuActive = (pathName: any) => {
    const isActiveMenu = router.pathname
      .replace('/', '')
      .includes(pathName.replace('/', ''));
    if (pathName !== '/') {
      return isActiveMenu;
    }

    return router.pathname === '/';
  };

  const handleClickMenuItem = (pathName: any) => {
    if (pathName === ROUTES.PAYMENT) {
      router.push(ROUTES.PAYMENT_INVOICE);
      return;
    }

    router.push(pathName);
  };

  const handleLogOut = async () => {
    // await Auth.signOut();
    // dispatch(resetUserData());
    // dispatch(resetCompanyData());
    // router.push('/login');
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <MenuList moveRight={variant === 'home'}>
        {/* {(variant === 'dashboard' ? menus : homeMenus).map((menu: any) => (
          <MenuItem
            active={isMenuActive(menu.pathName)}
            key={menu.name}
            onClick={() => handleClickMenuItem(menu.pathName)}
          >
            {menu.name}
          </MenuItem>
        ))} */}
      </MenuList>
      {variant === 'dashboard' && (
        <HeaderButtonContainer>
          <HeaderButton>
            <Bell />
          </HeaderButton>
          <HeaderButton
            onClick={(e) => {
              e.stopPropagation();
              setSettingOpen(!settingOpen);
            }}
          >
            <Cog />
            {settingOpen && (
              <ContextMenuOverlay
                onClick={(e) => {
                  e.stopPropagation();
                  setSettingOpen(false);
                }}
              >
                <ContextMenuContainer width={665}>
                  <ContextMenuHeader>Settings</ContextMenuHeader>
                  <SettingsMenuItemContainer>
                    {settingsItems.map((item) => {
                      return (
                        <ContextMenuItem
                          key={item.title}
                          onClick={(e) => {
                            e.stopPropagation();
                            item.route && router.push(item.route);
                          }}
                        >
                          <SettingsItemIcon>{item.icon}</SettingsItemIcon>
                          <SettingsItemText>{item.title}</SettingsItemText>
                        </ContextMenuItem>
                      );
                    })}
                  </SettingsMenuItemContainer>
                </ContextMenuContainer>
              </ContextMenuOverlay>
            )}
          </HeaderButton>
          <HeaderButton
            onClick={(e) => {
              e.stopPropagation();
              setProfileOpen(!profileOpen);
            }}
          >
            <Person />
            {profileOpen && (
              <ContextMenuOverlay
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(false);
                }}
              >
                <ContextMenuContainer width={300}>
                  <ContextMenuHeader>Profile</ContextMenuHeader>
                  <SettingsMenuItemContainer>
                    <ContextMenuItem onClick={handleLogOut}>
                      <SettingsItemIcon>
                        <Business />
                      </SettingsItemIcon>
                      <SettingsItemText>Log out</SettingsItemText>
                    </ContextMenuItem>
                  </SettingsMenuItemContainer>
                </ContextMenuContainer>
              </ContextMenuOverlay>
            )}
          </HeaderButton>
        </HeaderButtonContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
