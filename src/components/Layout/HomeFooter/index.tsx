import styled from 'styled-components';
import Logo from '../../Logo';
import Typography from '../../Typography';
import Facebook from 'image/icon/facebook.svg';
import Instagram from 'image/icon/instagram.svg';
import Linkedin from 'image/icon/linkedin.svg';
import Twitter from 'image/icon/twitter.svg';
import AppStore from 'image/icon/appStore.svg';
import GooglePlay from 'image/icon/googlePlay.svg';

const Container = styled.div`
  font-family: Montserrat;
  margin-top: 57px;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  border-top: 1px solid #dbe3eb;
  /* ${({ theme }: any) => theme.media.sm`
    flex-direction: column;
  `} */
  padding-top: 54px;
`;

const LightText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 25px;
  color: #8181a5;
`;

const SocialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  svg:not(:first-child):not(:last-child) {
    padding: 0 4px;
  }
`;

const Copyright = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #8181a5;
  display: block;
  width: 100%;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 30px;
  border-top: 1px solid #dbe3eb; ;
`;

const FooterLinkList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 5px 0;

  li {
    margin: 10px 0;
  }
`;

const AppStoresWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;

  svg:first-child {
    margin-right: 10px;
  }

  svg:last-child {
    margin-left: 10px;
  }
`;

const HomeFooter = () => {
  return (
    <Container>
      <Content>
        <div>
          <Logo size="small" />
          <LightText>Contact us</LightText>
          <Typography variant="body5">support@fena.co</Typography>
          <SocialWrapper>
            <Facebook />
            <Twitter />
            <Linkedin />
            <Instagram />
          </SocialWrapper>
        </div>
        <div>
          <Typography variant="body5">Resources</Typography>
          <FooterLinkList>
            <li>
              <LightText>Blog</LightText>
            </li>
            <li>
              <LightText>Help Centre</LightText>
            </li>
            <li>
              <LightText>How to pay with fena</LightText>
            </li>
            <li>
              <LightText>How fena terminal works</LightText>
            </li>
            <li>
              <LightText>Order fena NFC card</LightText>
            </li>
          </FooterLinkList>
        </div>
        <div>
          <Typography variant="body5">Legal</Typography>
          <FooterLinkList>
            <li>
              <LightText>Privacy policy</LightText>
            </li>
            <li>
              <LightText>Terms and conditions</LightText>
            </li>
            <li>
              <LightText>Fena Consumer App</LightText>
            </li>
            <li>
              <LightText>Fena Merchant App</LightText>
            </li>
            <li>
              <LightText>Security </LightText>
            </li>
          </FooterLinkList>
        </div>
        <div>
          <Typography variant="body5">Download the app</Typography>
          <AppStoresWrapper>
            <GooglePlay />
            <AppStore />
          </AppStoresWrapper>
        </div>
      </Content>
      <Copyright>
        @fena 2022. Fena is a trading name of FaizPay. All rights reserved.
        FaizPay is authorised and regulated by the Financial Conduct Authority
        (#934835)
      </Copyright>
    </Container>
  );
};

export default HomeFooter;
