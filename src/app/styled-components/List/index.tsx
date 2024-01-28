import styled from 'styled-components';

export const Styledlist = styled.div`
  width: 100%;
  // overflow-x: hidden;
  .list-content {
    overflow-y: scroll;
    max-height: 450px;
    // height: 75vh;
    // overflow-x: hidden;
    // ::-webkit-scrollbar {
    //   height: 2px;
    //   width: 2px;
    //   border: 1px solid black;
    // }
    // ::-webkit-scrollbar-track {
    //   background: rgb(16, 16, 16);
    // }
  }
`;

export const StyledListItem = styled.div<{
  header?: boolean;
  count_text: number;
}>`
  width: calc(100% - 1em);
  background: ${(props) => (props.header ? '' : 'rgb(16, 16, 16)')};
  padding: 0.5em;
  margin-top: 0.25em;
  transition: all 0.2s linear;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 2px;
    width: 2px;
    border: 1px solid black;
  }
  ::-webkit-scrollbar-track {
    background: rgb(16, 16, 16);
  }
  .item-content {
    width: calc(70% - 9em);
    min-width: 720px;
    gap: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      min-width: 180px;
      max-width: 320px;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      ${(props) =>
        props.header
          ? `
          font-size: 16px;
          font-weight: 650;
          text-transform: uppercase;`
          : `
          cursor: pointer;
          `}
      width: ${(props) => (100 / props.count_text).toFixed(2)}%;
    }
  }
  .item-buttons-container {
    // width: 25%;
    min-width: 240px;
    // max-width: 320px;
    display: flex;
    // justify-content: space-around;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
  }
`;

export const StyledListItemButton = styled.div<{ design?: string }>`
  width: 80px;
  height: 36px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s linear;
  z-index: 3;
`;
