import { media } from 'helpers';

import styled from '@emotion/styled';

export const BoardWrap = styled.div`
  padding: 14px 20px 24px;
  background-color: ${props => `${props.theme.palette.background.bord}`};
  background-repeat: no-repeat;
  background-image: url(${props => props.bg});
  background-size: cover;
  color: ${props => `${props.theme.palette.text.primary}B2`};
  min-height: calc(100vh - 60px);

  ${media.MEDIUM`
  padding: 26px 32px;
  min-height: calc(100vh - 68px);
  `}

  ${media.LARGE`
  padding: 10px 24px 8px;
  `}
`;

export const DefaultWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 98px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  ${media.SMALL`
  padding: 0 20px;
  width: 375px;
  `}

  ${media.MEDIUM`
  padding: 0;
  width: 486px;
  height: calc(100vh - 126px);
  `}

  ${media.LARGE`
  padding: 0;
  width: 486px;
  height: calc(100vh - 86px);
  `}
`;

export const WelcomeText = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.24px;
  color: ${props => `${props.theme.palette.text.primary}B2`};
  text-align: center;
`;

export const CreateBoardLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${props => `${props.theme.palette.hover.inputAndIcon}`};
`;
