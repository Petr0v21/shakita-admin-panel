import { PREV, NEXT } from '@/types';
import styled from 'styled-components';

export const Item = styled.div<{ img: string }>`
  text-align: center;
  padding: 100px;
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
`;

export const CarouselContainer = styled.div<{ sliding: boolean }>`
  display: flex;
  transition: ${(props) => (props.sliding ? 'none' : 'transform 1s ease')};
  transform: ${(props) => {
    if (!props.sliding) return 'translateX(calc(-80% - 15px))';
    if (props.dir === PREV) return 'translateX(calc(2 * (-80% - 15px)))';
    return 'translateX(0%)';
  }};
`;
// export const CarouselContainer = styled.div<{sliding: boolean}>`
//   display: flex;
//   transition: ${(props) => (props.sliding ? "none" : "transform 1s ease")};
//   transform: ${(props) => {
//     if (!props.sliding) return "translateX(calc(-80% - 20px))";
//     if (props.dir === PREV) return "translateX(calc(2 * (-80% - 20px)))";
//     return "translateX(0%)";
//   }};
// `;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const CarouselSlot = styled.div<{ order: number }>`
  flex: 1 0 100%;
  flex-basis: 92%;
  // margin-right: 20px;
  order: ${(props) => props.order};
  display: flex;
  justify-content: center;
  .swiper-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: grab;
  }
`;

export const SlideButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const SlideButton = styled.button<{ float: 'left' | 'right' }>`
  color: #ffffff;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 100;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
`;

export const PatternBox = styled.div`
  border: 2px solid black;
  width: 60%;
  margin: 20px auto;
  padding: 30px 20px;
  white-space: pre-line;
`;

export const D = styled.span`
  padding: 3px;
`;

export const SwiperStyled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
