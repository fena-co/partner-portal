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
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }
`;

const LightText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 25px;
  color: #8181a5;
  margin-top: 15px;
`;

const ContactLightText = styled(LightText)`
  padding-bottom: 1px;
  text-decoration: underline;
`;

const SocialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  svg:not(:first-child):not(:last-child) {
    padding: 0 4px;
  }
  @media (max-width: 900px) {
    margin-bottom: 20px;
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
  @media (max-width: 900px) {
    margin-bottom: 20px;
  }
`;

const StyledA = styled.a`
  text-decoration: none;
`;

const SocialA = styled.a`
  margin-right: 5px;
`;

const ResponsiveContent = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Styledli = styled.li`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HomeFooter = () => {
  return (
    <Container>
      <Content>
        <ResponsiveContent>
          <Logo size="small" />
          <StyledA
            href="https://help.fena.co/support/tickets/new "
            target="_blank"
          >
            <ContactLightText>Contact us</ContactLightText>
          </StyledA>
          <SocialWrapper>
            <SocialA
              href="https://www.facebook.com/fenapayment"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook />
            </SocialA>
            <SocialA
              href="https://twitter.com/fenapayment"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter />
            </SocialA>
            <SocialA
              href="https://www.linkedin.com/company/faizpay-fena/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
            </SocialA>
            <SocialA
              href="https://www.instagram.com/fenapayments/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram />
            </SocialA>
          </SocialWrapper>
        </ResponsiveContent>
        <ResponsiveContent>
          <Typography variant="body5">Resources</Typography>
          <FooterLinkList>
            <Styledli>
              <StyledA
                href="https://www.fena.co/blog"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>Blog</LightText>
              </StyledA>
            </Styledli>
            <Styledli>
              <StyledA
                href="https://help.fena.co/support/home"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>Help Centre</LightText>
              </StyledA>
            </Styledli>
            <Styledli>
              <StyledA
                href="https://www.fena.co/how-to-pay-with-fena"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>How to pay with fena</LightText>
              </StyledA>
            </Styledli>
            <Styledli>
              <StyledA
                href="https://www.fena.co/how-fena-terminal-works"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>How fena terminal works</LightText>
              </StyledA>
            </Styledli>
            <Styledli>
              <StyledA
                href="https://www.fena.co/order-fena-nfc-card"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>Order fena NFC card</LightText>
              </StyledA>
            </Styledli>
          </FooterLinkList>
        </ResponsiveContent>
        <ResponsiveContent>
          <Typography variant="body5">Legal</Typography>
          <FooterLinkList>
            <Styledli>
              <StyledA
                href="https://www.fena.co/privacy-policy"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>Privacy policy</LightText>
              </StyledA>
            </Styledli>
            <Styledli>
              <StyledA
                href="https://www.fena.co/terms-and-conditions"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>Terms and conditions</LightText>
              </StyledA>
            </Styledli>
            <Styledli>
              <StyledA
                href="https://www.fena.co/terms-and-conditions-fena-consumer-app"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>Fena Consumer App</LightText>
              </StyledA>
            </Styledli>
            <Styledli>
              <StyledA
                href="https://www.fena.co/terms-and-conditions-merchant-app"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>Fena Merchant App</LightText>
              </StyledA>
            </Styledli>
            <Styledli>
              <StyledA
                href="https://www.fena.co/security"
                target="_blank"
                rel="noreferrer"
              >
                <LightText>Security </LightText>
              </StyledA>
            </Styledli>
          </FooterLinkList>
        </ResponsiveContent>
        <ResponsiveContent>
          {/* <Typography variant="body5">Download the app</Typography>
          <AppStoresWrapper>
            <StyledA
              href="https://play.google.com/store/apps/details?id=co.fena.merchant"
              target="_blank"
              rel="noreferrer"
            >
              <GooglePlay />
            </StyledA>
            <StyledA
              href="https://apps.apple.com/gb/app/fenamerchant/id1586556024"
              target="_blank"
              rel="noreferrer"
            >
              <AppStore />
            </StyledA>
          </AppStoresWrapper> */}
        </ResponsiveContent>
      </Content>
      <Copyright>
        ©fena 2022. Fena is a trading name of Fena Labs Ltd. All rights
        reserved. Fena Labs Ltd is authorised and regulated by the Financial
        Conduct Authority (#934835)
      </Copyright>
    </Container>
  );
};

export default HomeFooter;
