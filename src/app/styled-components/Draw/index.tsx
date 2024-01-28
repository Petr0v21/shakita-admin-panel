import styled from 'styled-components';
import { StyledBookType } from '../../../types';

export const StyledDraw = styled.div<StyledBookType>`
  height: auto;
  max-width: 450px;
  min-width: 300px;
  @media (max-width: 1184px) {
    margin: auto;
    // width: 80%;
    height: auto;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    props.places.map(({ placeId }) => {
      if (props.choosedPlaces === placeId) {
        return `
        .${placeId} {
          fill: yellow;
        }
        `;
      }
      if (props.placesActive.find((table) => table.place === placeId)) {
        return `
        .${placeId} {
          fill: red;
          cursor: not-allowed;
        }
        `;
      } else {
        return `
        .${placeId} {
          fill: green;
          cursor: pointer;
          transition: all 0.5s ease;
          &:hover {
            fill: yellow;
          }
          &:focus {
            fill: yellow;
          }
        }
        `;
      }
    })}
`;
