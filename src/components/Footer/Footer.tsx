import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import TelegramSrc from "assets/svg/socials/telegram.svg";
import TwitterSrc from "assets/svg/socials/twitter.svg";
import LinkedInSrc from "assets/svg/socials/linkedln.svg";

const FooterWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  background: #0d0d0d;
  border-top: 1px solid #072a40;
  padding: 20px 24px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    gap: 16px;
    justify-content: center;
  }
`;

const LinksWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 16px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 16px;
  }

  a {
    font-size: 13px;
    font-weight: 500;
    color: #7b9ea6;
    opacity: 0.8;
    display: flex;
    justify-content: start;
    padding: 0;

    &:hover {
      opacity: 1;
    }
  }
`;

const SocialLinksWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 0;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    gap: 20px;
  }

  & a {
    height: 20px;

    ${({ theme }) => theme.breakpoints.down("sm")} {
      height: 28px;
    }
  }

  & img {
    height: 20px;
    width: 20px;

    ${({ theme }) => theme.breakpoints.down("sm")} {
      height: 28px;
      width: 28px;
    }
  }
`;

// const Copyright = styled(Box)`
//   font-size: 13px;
//   font-weight: 400;
//   color: #7b9ea6;
//   opacity: 0.8;
// `;

const Footer = () => {
  return (
    <FooterWrapper>
      <LinksWrapper>
        <a href={"https://splyce.finance"} rel="noreferrer" target={"_blank"}>
          splyce.fi
        </a>
        <a href={"#"} rel="noreferrer" target={"_blank"}>
          Docs
        </a>
        <a href={"#"} rel="noreferrer" target={"_blank"}>
          Privacy Policy
        </a>
        <a href={"#"} rel="noreferrer" target={"_blank"}>
          Terms of Service
        </a>
        <a href={"#"} target={"_blank"} rel="noreferrer">
          spUSD
        </a>
        <a href={"#"} target={"_blank"} rel="noreferrer">
          SPLY
        </a>
      </LinksWrapper>
      {/*<Copyright>*/}
      {/*  {"Copyright©"}*/}
      {/*  <Link color="inherit" fontSize="inherit" href="https://fathom.fi/">*/}
      {/*    Fathom App*/}
      {/*  </Link>*/}
      {/*  {new Date().getFullYear()}.*/}
      {/*</Copyright>*/}
      <SocialLinksWrapper>
        <a href={"#"} rel="noreferrer" target={"_blank"}>
          <img src={TelegramSrc} alt={"telegram"} />
        </a>
        <a
          href={"https://x.com/splycefi?s=21&t=GTHQKPCsYjg0opJNZEmJRw"}
          rel="noreferrer"
          target={"_blank"}
        >
          <img src={TwitterSrc} alt={"twitter"} />
        </a>
        <a href={"#"} rel="noreferrer" target={"_blank"}>
          <img src={LinkedInSrc} alt={"linked-in"} />
        </a>
      </SocialLinksWrapper>
    </FooterWrapper>
  );
};

export default Footer;
