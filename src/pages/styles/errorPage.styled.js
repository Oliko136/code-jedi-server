import { media } from 'helpers';
import {
  // checkBgColor,
  checkBgImg,
  // checkBtnBgColor,
  // checkBtnTxtColor,
  // checkTxtColor,
} from 'helpers/errorPageThemes';

import styled from '@emotion/styled';

export const ErrorBackground = styled.section`
  background-color: ${props => `${props.theme.palette.background.bord}`};
  background-image: var(${({ bgImg }) => checkBgImg(bgImg)});
  color: ${props => `${props.theme.palette.text.primary}`};

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Container = styled.div`
  padding: 0 20px;
  min-width: 200px;

  ${media.MEDIUM`
  width: 500px;
  `}

  ${media.LARGE`
  width: 1000px;
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;

  margin-bottom: 48px;

  ${media.MEDIUM`
  flex-direction: row;
  `}
`;

export const Code = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;

  display: flex;
  flex-direction: column;

  ${media.LARGE`
  font-size: 50px;
  `}
`;

export const Num = styled.p`
  display: block;

  font-size: 60px;
  line-height: 60px;

  ${media.LARGE`
  font-size: 100px;
  line-height: 100px;
  `}
`;

export const Description = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;

  text-align: center;

  ${media.LARGE`
  font-size: 40px;
    line-height: 40px;
  `}
`;

export const Start = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;

  ${media.maxPREMEDIUM`
  margin-bottom: 14px;
  `}

  ${media.LARGE`
  font-weight: 600;
    font-size: 20px;
    line-height: 40px;
  `}
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  margin-bottom: 14px;
`;

export const Link = styled.li`
  padding: 14px 0;
  width: 100%;
  background-color: ${props =>
    `${props.theme.palette.background.primaryButton}`};
  border-radius: 8px;
  color: ${props => `${props.theme.palette.text.secondary}`};
  margin-bottom: 14px;

  list-style: none;

  &:hover {
    background-color: ${props => `${props.theme.palette.hover.primaryButton}`};
  }
`;

export const InviteText = styled.span`
  display: inline-block;
  margin-top: 14px;

  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;
