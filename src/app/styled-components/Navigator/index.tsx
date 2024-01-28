import styled from 'styled-components';

export const CalaudNavigatorStyled = styled.div`
  width: 800px;
  height: 600px;
  position: relative;
  .nav-fon {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 800px;
    height: 600px;
  }
  .calaud {
    .calaud-main {
      position: absolute;
      top: 25%;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      z-index: 2;
      width: 300px;
      height: 300px;
    }
    div {
      position: absolute;
      background: black;
      border-radius: 6px;
      width: 75px;
      height: 75px;
      z-index: 3;
      transition: all 0.2s linear;
    }
    .coal-1 {
      top: 38%;
      left: 39%;
      rotate: 100deg;
    }
    .coal-2 {
      top: 38%;
      left: 51.5%;
      rotate: 24deg;
    }
    .coal-3 {
      top: 54%;
      left: 46%;
    }
  }
  a {
    opacity: 0.7;
    cursor: pointer;
    position: absolute;
    color: white;
    z-index: 4;
    text-transform: uppercase;
    width: 300px;
    height: 58px;
    transition: all 0.1s linear;
    .link-content {
      position: relative;
      span {
        position: absolute;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
      svg {
        position: absolute;
      }
    }
    &:hover {
      opacity: 1;
    }
  }
  .link-1 {
    top: 22%;
    left: -2%;
    .link-content {
      span {
        width: 265px;
        left: 5%;
        top: 10px;
      }
    }
  }
  .link-2 {
    top: 22%;
    right: -2%;
    .link-content {
      span {
        left: 20%;
        top: 10px;
      }
    }
  }
  .link-3 {
    bottom: 14%;
    right: 8%;
    .link-content {
      span {
        left: 20%;
        top: 10px;
      }
    }
  }
`;

export const MobileNavigatorStyled = styled.div`
  position: relative;
  width: 100vw;
  max-width: 850px;
  height: 100vw;
  a {
    width: 100%;
    height: 25%;
    position: absolute;
    div {
      position: relative;
      span {
        position: absolute;
        color: white;
        z-index: 4;
        text-transform: uppercase;
        //mobileL
        //  top: 9vw;
        top: 11vw;
        //mobileL
        // width: 180px;
        width: 240px;
        height: 90px;
        color: #fff;
        //mobileL
        // font-size: 18px;
        @media (max-width: 485px) {
          font-size: 18px;
          width: 180px;
        }
        @media (max-width: 375px) {
          font-size: 16px;
          width: 160px;
        }
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        transition: all 0.2s linear;
        cursor: pointer;
      }
      img {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: auto;
        transition: all 0.2s linear;
        &:hover {
          opacity: 0.5;
        }
      }
    }
  }
  .nav-mobile-link-1 {
    top: 0;
    span {
      right: 10%;
      @media (max-width: 485px) {
        right: 5%;
      }
    }
  }
  .nav-mobile-link-2 {
    top: 26.5vw;
    span {
      left: 10%;
      width: 280px;
      @media (max-width: 485px) {
        left: 5%;
      }
    }
  }
  .nav-mobile-link-3 {
    top: 53vw;
    span {
      right: 10%;
      top: 12vw;
      @media (max-width: 485px) {
        right: 5%;
        top: 10vw;
      }
    }
  }
`;
